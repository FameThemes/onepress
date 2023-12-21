import * as iconsObj from "../fontawesome/icons.json";
import { render, useState, useEffect } from "@wordpress/element";

import { ReactComponent as IconRemove } from "./remove.svg";
import Modal from "react-modal";

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


const listFonts = Object.keys(C_Icon_Picker.fonts).map(id => {

  const label = C_Icon_Picker.fonts[id].name || id;
  return {
    label,
    value: id,
  }
})

const App = ({ data, el }) => {
  const { icon } = data;
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(icon);
  const [cats, setCats] = useState([]);
  const [listIcons, setListIcons] = useState([]);
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

  useEffect(() => {
    // el.addEventListener('change', () => {
    //   setValue(el.value);
    // })
  }, []);

  // console.log("cats", cats);
  // console.log("icons", icons);
  // const currentStyles = [...cats];

  useEffect(() => {
    const newListIcons = icons
      .filter((icon) => icon?.svg)
      .filter((icon) => {
        if (!cats?.length) {
          return true;
        }

        if (cats?.length) {
          for (let i = 0; i < cats.length; i++) {
            if (icon.styles?.length && icon.styles.includes(cats[i])) {
              return true;
            }
          }
        }
        return false;
      })
      .filter((icon) => {
        if (!search?.length) {
          return true;
        }
        if (icon?.label?.toLowerCase?.().includes(search?.toLowerCase())) {
          return true;
        }

        return false;
      });

    setListIcons(newListIcons);
  }, [cats, search]);

  return (
    <>
      <div className="onepress_icon_preview_wrap">
        <div className="onepress_icon_preview">
          <div
            className="icon-item"
            onClick={() => setIsOpenModal(true)}
            dangerouslySetInnerHTML={{
              __html: value,
            }}
          ></div>
          <span className="remove" onClick={() => handleClick(null)}>
            <IconRemove />
          </span>
        </div>
      </div>

      <Modal
        className="onepress_icon_modal"
        isOpen={isOpenModal}
        onRequestClose={(e) => setIsOpenModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <div className="onepress_icon_picker">
          <div className="onepress_icon_filter">
            <div className="f1 onepress_icon_space">
              <select className="space-item">
                {listFonts.map(el => {
                  return <option value={el.value} key={el.value}>{el.label}</option>
                })}

              </select>
              <select className="space-item">
                <option>All Styles</option>
                {listCat.map((cat, index) => {
                  return (
                    <option
                      value={cat}
                      key={cat}
                    >
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="f2 ml-auto onepress_icon_space">
              <input
                className="search space-item"
                type="search"
                placeholder="Search icon..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="space-item close"
              >
                <IconRemove />
              </button>
            </div>
          </div>
          <div className="onepress_icon_wrap">
            <div className="onepress_icon_inner">
              <div className="onepress_icon_list">
                {listIcons.map((icon) => {
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
