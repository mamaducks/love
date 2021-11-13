import { Menu, MenuItem, Typography, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NestedMenuItem from "material-ui-nested-menu-item";
import React, { useState } from "react";
import { useSelectedSections, useSite } from "./SiteContext";
import {
  GiSelfLove,
  GiAbstract053,
  GiClover,
  GiBookCover,
  GiCloverSpiked,
  GiAbstract061,
  GiFairyWings,
  GiTechnoHeart,
  GiTentacleHeart,
  GiGlassHeart,
  GiShiningHeart,
  GiAbstract114,
  GiAbstract047,
  GiAbstract077,
  GiAbstract092,
  GiAbstract010,
  GiAbstract111,
  GiAbstract116,
  GiHeartInside,
  GiHolyOak,
  GiSwirledShell,
GiBookshelf,
} from "react-icons/gi";
import { DiAtom } from "react-icons/di";
import { FaSkyatlas, FaYinYang, FaBook } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  i: {
    color: "#4c8490",
    width: "125px",
    display: "flex",
    justifyContent: "space-between"
  },
  headLabel: {
    color: "azure"
  },
  menuRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15
  }
}));

export function getMenuIcon(sectionLabel) {
  switch (sectionLabel) {
    case "Grow":
      return <GiFairyWings />;
    case "Love":
      return <GiSelfLove />;
    case "Move":
      return <GiHeartInside />;

    case "Believe":
      return <GiTentacleHeart />;

    default:
      return null;
  }
}

export function getSubMenuIcon(sectionLabel) {
  switch (sectionLabel) {
    case "Books":
      return <FaBook />;

    case "Sites":
      return <GiAbstract010 />;

    case "Quotes":
      return <FaYinYang />;

    case "Organize":
      return <GiAbstract111 />;

    default:
      return null;
  }
}

export default function({ onNavigate }) {
  const [menuPosition, setMenuPosition] = useState(null);
  const { sections, subSections } = useSite();
  const classes = useStyles();

  const { gotoSection } = useSelectedSections();

  const handleClick = event => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: 50,
      left: 100
    });
  };

  const handleItemClick = (section, subSection) => {
    onNavigate();
    setMenuPosition(null);
    gotoSection(section, subSection);
  };

  return (
    <div onClick={handleClick}>
      <Typography className={classes.headLabel}>Menu</Typography>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        {sections.map(section => (
          <div className={classes.menuRow}>
            {getMenuIcon(section.label)}
            <NestedMenuItem
              className={classes.subHead}
              label={section.label}
              parentMenuOpen={!!menuPosition}
              onClick={e => {
                e.preventDefault();

                handleItemClick(section.label);
              }}
            >
              {subSections.map(subSection => (
                <div className={classes.menuRow}>
                  {getSubMenuIcon(subSection.label)}
                  <MenuItem
                    className={classes.subHead}
                    onClick={e => {
                      e.preventDefault();

                      handleItemClick(section.label, subSection.label);
                    }}
                  >
                    {subSection.label}
                  </MenuItem>
                </div>
              ))}
            </NestedMenuItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}