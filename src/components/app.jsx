import * as iconsObj from "../fontawesome/icons.json";
import { render, useState, useEffect } from "@wordpress/element";

const IconGroups = ({ cats, icon, onClick }) => {
  if (!icon?.svg) {
    return null;
  }

  const currentStyles = cats?.length ? cats : icon?.styles || [];

  return (
    <>
      {currentStyles.map((cat) => {
        if (!icon?.svg[cat] || typeof icon.svg[cat] === "undefined") {
          return null;
        }
        const code = icon.svg[cat].raw;
        return (
          <div
            key={[cat, icon?.unicode].join(".")}
            title={icon?.label}
            className="icon-wrapper"
            onClick={() => onClick(code)}
          >
            <div
              className="icon-item"
              dangerouslySetInnerHTML={{
                __html: code,
              }}
            ></div>
            <div className="icon-label">{icon?.label}</div>
          </div>
        );
      })}
    </>
  );
};

const App = ({ data, el }) => {
  const { icon } = data;
  const [search, setSearch] = useState();
  const [value, setValue] = useState(icon);
  const [cats, setCats] = useState([]);
  const icons = Object.values(iconsObj);
  const listCat = [];

  icons.map((icon) => {
    icon?.styles?.map?.((s) => {
      if (!listCat.includes(s)) {
        listCat.push(s);
      }
    });
  });

  const handleSearch = (value) => {
    setSearch(value);
  };
  const handleFilter = (value) => {
    setCats((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      return [...prev, value];
    });
  };

  const handleClick = (code) => {
    setValue(code);
    el.value = code;
    const event = new Event("change");
    // Dispatch it.
    el.dispatchEvent(event);
  };
  
  useEffect(()=> {
    // el.addEventListener('change', () => {
    //   setValue(el.value);
    // })
  },[])

  console.log("cats", cats);
  // console.log("icons", icons);
  const currentStyles = [...cats];
  return (
    <>
      <div className="onepress_icon_preview">
        <div
          className="icon-item"
          dangerouslySetInnerHTML={{
            __html: value,
          }}
        ></div>
      </div>
      <div className="onepress_icon_picker">
        <div className="onepress_icon_filter">
          <div className="onepress_icon_styles">
            {listCat.map((cat, index) => {
              const classes = ["filter-item"];
              if (cats.includes(cat)) {
                classes.push("active");
              }
              return (
                <div
                  onClick={() => handleFilter(cat)}
                  className={classes.join(" ")}
                  key={cat}
                >
                  {cat}
                </div>
              );
            })}
          </div>
          <input
            className="search"
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="onepress_icon_list">
          {icons.map((icon) => {
            if (search?.length > 0) {
              if (
                !icon?.label?.toLowerCase?.().includes(search?.toLowerCase())
              ) {
                return null;
              }
            }
            return (
              <IconGroups
                key={["gic", icon?.unicode].join(".")}
                cats={cats}
                icon={icon}
                onClick={handleClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
