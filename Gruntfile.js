const concatJSFiles = [
  "assets/js/plugins.js",
  "assets/js/jarallax.js",
  "assets/js/bootstrap.min.js",
  "assets/js/theme.js",
];

const fs = require("fs");
const path = require("path");

module.exports = function (grunt) {
  "use strict";
  var pkgInfo = grunt.file.readJSON("package.json");
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // Autoprefixer.
    postcss: {
      options: {
        style: "expanded",
      },
      dist: {
        src: ["assets/css/*.css", "*.css"],
      },
    },

    // SASS
    sass: {
      options: {
        precision: 10,
      },
      dist: {
        options: {
          style: "expanded",
        },

        files: [
          {
            "style.css": "assets/sass/style.scss",
            "editor-style.css": "assets/sass/editor.scss",
          },
        ],
      },
    },

    // Watch changes for assets.
    watch: {
      css: {
        files: [
          "assets/sass/*.scss",
          "assets/js/*.js",
          "!assets/js/theme-all.js",
          "!assets/js/theme-all.min.js",
        ],
        tasks: ["css", "concat"],
      },
    },

    copy: {
      main: {
        options: {
          mode: true,
        },
        src: [
          "**",
          "!node_modules/**",
          "!src/**",
          "!css/sourcemap/**",
          "!.git/**",
          "!bin/**",
          "!.gitlab-ci.yml",
          "!bin/**",
          "!tests/**",
          "!phpunit.xml.dist",
          "!*.sh",
          "!*.map",
          "!**/*.map",
          "!Gruntfile.js",
          "!package.json",
          "!.gitignore",
          "!phpunit.xml",
          "!README.md",
          "!sass/**",
          "!src/**",
          "!codesniffer.ruleset.xml",
          "!vendor/**",
          "!composer.json",
          "!composer.lock",
          "!package-lock.json",
          "!phpcs.xml.dist",
          "!webpack.config.js",
          "!.babelrc",
          // Since 2.3.18: dev-only documentation should not ship in the
          // distributable zip. `docs/` and `plans/` hold spec / plan /
          // agent guides; `plan-*.md` anywhere is a development artifact.
          "!docs/**",
          "!plans/**",
          "!**/plan-*.md",
        ],
        dest: "onepress/",
      },
    },

    compress: {
      main: {
        options: {
          archive: "onepress-" + pkgInfo.version + ".zip",
          mode: "zip",
        },
        files: [
          {
            src: ["./onepress/**"],
          },
        ],
      },
    },

    clean: {
      main: ["onepress"],
      zip: ["*.zip"],
    },

    bumpup: {
      options: {
        updateProps: {
          pkg: "package.json",
        },
      },
      file: "package.json",
    },

    replace: {
      theme_main: {
        src: [
          "style.css",
        ],
        overwrite: true,
        replacements: [
          {
            from: /Version: \bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?(?:\+[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?\b/g,
            to: "Version: <%= pkg.version %>",
          },
        ],
      },
    },

    concat: {
      options: {
        separator: ";\n",
        sourceMap: true,
      },
      dist: {
        src: concatJSFiles,
        dest: "assets/js/theme-all.js",
      },
    },

    uglify: {
      options: {
        sourceMap: false,
        mangle: false,
      },
      my_target: {
        files: {
          "assets/js/theme-all.min.js": ["assets/js/theme-all.js"],
        },
      },
    },

    shell: {
      build: {
        command: 'yarn build'
      }
    }
  });

  // Load NPM tasks to be used here
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-wp-i18n");
  grunt.loadNpmTasks("grunt-bumpup");
  grunt.loadNpmTasks("grunt-text-replace");

  // Register tasks
  grunt.registerTask("default", ["watch", "css"]);
  grunt.registerTask("css", [
    "sass",
    //'postcss',
    //'cssmin'
  ]);

  // To release new version just runt 2 commands below
  // Re create everything: grunt release --ver=<version_number>
  // Zip file installable: grunt zipfile

  grunt.registerTask("zipfile", [
    "clean:zip",
    "copy:main",
    "compress:main",
    "clean:main",
  ]);

  /**
   * Create or update the `v<version>` GitHub release for this theme.
   *
   * Behaviour:
   *   - If `v<version>` already exists on GitHub, the task refreshes the
   *     release notes (re-extracted from changelog.md) and replaces the
   *     attached zip via `--clobber`.
   *   - If `v<version>` doesn't exist, the task creates the release and
   *     tags HEAD of the current branch.
   *
   * Notes:
   *   - Release notes come from the matching `# <version>` block in
   *     changelog.md; falls back to "Release <version>" if not found.
   *   - Requires `gh` CLI authenticated (`gh auth login`). The task
   *     fails fast with a clear message if `gh` is missing or unauth'd.
   *   - Push local commits first — the tag will reference HEAD; an
   *     unpushed HEAD makes the release point at a commit origin
   *     hasn't seen.
   */
  grunt.registerTask(
    "gh_release",
    "Create/update GitHub release for current version",
    function () {
      const done = this.async();
      const os = require("os");
      const { execSync } = require("child_process");

      const version = pkgInfo.version;
      const tag = "v" + version;
      // Theme zip drops the `v` prefix that the plugin uses
      // (see compress:main config above — `onepress-<version>.zip`).
      const zip = "onepress-" + version + ".zip";

      if (!fs.existsSync(zip)) {
        grunt.fail.fatal(
          "Release zip not found: " + zip + " — run `zipfile` first."
        );
        return done(false);
      }

      try {
        execSync("gh --version", { stdio: ["ignore", "ignore", "ignore"] });
      } catch (e) {
        grunt.fail.fatal(
          "`gh` CLI not found. Install from https://cli.github.com and run `gh auth login`."
        );
        return done(false);
      }

      try {
        execSync("gh auth status", { stdio: ["ignore", "ignore", "ignore"] });
      } catch (e) {
        grunt.fail.fatal(
          "`gh` CLI is not authenticated — run `gh auth login`."
        );
        return done(false);
      }

      // Pull the matching changelog block from changelog.md.
      //   Match `# 2.3.18` heading up to next `# <next-version>` or EOF.
      //   No /m flag — `$` must mean end-of-string here so the lookahead
      //   only terminates at the next version header or true EOF.
      //   `(?:^|\n)` handles the heading anywhere in the file.
      let notes = "";
      try {
        const changelog = fs.readFileSync("changelog.md", "utf8");
        const versionEsc = version.replace(/\./g, "\\.");
        const re = new RegExp(
          "(?:^|\\n)#\\s*" +
            versionEsc +
            "\\s*\\n([\\s\\S]*?)(?=\\n#\\s+[\\w\\.]|$)"
        );
        const m = changelog.match(re);
        if (m) {
          notes = m[1].replace(/\r/g, "").trim();
        }
      } catch (e) {
        // best-effort; fall through to default notes below
      }
      if (!notes) {
        notes = "Release " + version;
      }

      const notesPath = path.join(
        os.tmpdir(),
        "onepress-gh-release-notes-" + Date.now() + ".md"
      );
      fs.writeFileSync(notesPath, notes);

      function shellEscape(s) {
        return "'" + String(s).replace(/'/g, "'\\''") + "'";
      }

      function runVisible(cmd) {
        grunt.log.writeln("$ " + cmd);
        execSync(cmd, { stdio: ["inherit", "inherit", "inherit"] });
      }

      // Probe for existing release. Non-zero exit = doesn't exist.
      let exists = false;
      try {
        execSync(
          "gh release view " + shellEscape(tag) + " --json tagName -q .tagName",
          { stdio: ["ignore", "pipe", "ignore"] }
        );
        exists = true;
      } catch (e) {
        exists = false;
      }

      try {
        if (exists) {
          grunt.log.writeln(
            "Release " + tag + " exists — updating notes + replacing zip."
          );
          runVisible(
            "gh release edit " +
              shellEscape(tag) +
              " --notes-file " +
              shellEscape(notesPath)
          );
          runVisible(
            "gh release upload " +
              shellEscape(tag) +
              " " +
              shellEscape(zip) +
              " --clobber"
          );
        } else {
          grunt.log.writeln(
            "Release " + tag + " does not exist — creating."
          );
          runVisible(
            "gh release create " +
              shellEscape(tag) +
              " " +
              shellEscape(zip) +
              " --title " +
              shellEscape(tag) +
              " --notes-file " +
              shellEscape(notesPath)
          );
        }
        grunt.log.ok(
          "GitHub release " + tag + " synced (asset: " + zip + ")."
        );
        done();
      } catch (e) {
        grunt.log.error(String((e && e.message) || e));
        grunt.fail.fatal("`gh` command failed — see output above.");
        done(false);
      } finally {
        try {
          fs.unlinkSync(notesPath);
        } catch (_) {
          /* ignore */
        }
      }
    }
  );

  grunt.registerTask("release", function (ver) {
    let newVersion = pkgInfo.version;
    grunt.task.run("shell:build");
    grunt.task.run("bumpup:" + newVersion);
    grunt.task.run("replace");
    grunt.task.run("zipfile");
    grunt.task.run("gh_release");

    // i18n
    // grunt.task.run(['addtextdomain', 'makepot']);
    // re create css file and min
    // grunt.task.run(["css", "postcss", "concat", "uglify"]);
  });

  grunt.registerTask("load-icon", function () {
    const iconFile = path.resolve(
      __dirname,
      "src",
      "fontawesome",
      "icons.json"
    );
    // const saveFile = path.resolve(
    //   __dirname,
    //   "src",
    //   "fontawesome",
    //   "icon-list.json"
    // );
    const saveFile = path.resolve(
      __dirname,
      "inc",
      "list-icon-v6.php"
    );

    const objecList = grunt.file.readJSON(iconFile);
    const icons = [];
    const iconClassOnly = [];
    Object.keys(objecList).map((key) => {
      const icon = objecList[key];
      icon.styles.map((style) => {
        const className = `fa-${style} fa-${key}`;
        icons.push({
          key: key,
          code: icon.unicode,
          style: style,
          // plain: `fa-${style} fa-${key}`
        });
        iconClassOnly.push(className);
      });
    });

    fs.writeFileSync(saveFile, `<?php\n return '${iconClassOnly.join("|")}';`, "UTF8");
  });
};
