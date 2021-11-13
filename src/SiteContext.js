import React, { createContext, useContext } from "react";
import GrowSubSections from "./data/grow";
import MoveSubSections from "./data/move";
import LoveSubSections from "./data/love";
import BelieveSubSections from "./data/believe";
import GrowComments from "./data/growComments";
import BelieveComments from "./data/believeComments";
import LoveComments from "./data/believeComments";
import MoveComments from "./data/believeComments";

import {
  useLocation,
  useHistory,
 Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const defaultData = {
  sections: [
    {
      label: "Grow",
      subSections: GrowSubSections,
      comments: GrowComments,
      imgUrl: "Yousmile.png"
    },
    {
      label: "Love",
      subSections: LoveSubSections,
      comments: LoveComments,
      imgUrl: "Yousmile.png"
    },
    {
      label: "Move",
      subSections: MoveSubSections,
      comments: MoveComments,
      imgUrl: "Yousmile.png"
    },

    {
      label: "Believe",
      subSections: BelieveSubSections,
      comments: BelieveComments,
      imgUrl: "Yousmile.png"
    }
  ],

  subSections: [
    { label: "Books", field: "bookReviews" },
    { label: "Sites", field: "sites" },
    { label: "Quotes", field: "quotes" },
    { label: "Organize", field: "organize" }
  ],

  titles: [
    { id: 1, name: "Grow Top Picks" },
    { id: 2, name: "Love Top Picks" },
    { id: 3, name: "Move Top Picks" },
    { id: 4, name: "Believe Top Picks" }
  ]
};

const SiteContext = createContext(defaultData);

export function useSite() {
    return useContext(SiteContext);
  }

export function useSelectedSections() {
    const history = useHistory();
  
    const { pathname } = useLocation();
    const { sections, subSections } = useSite();
    const [sectionLabelItem, subSectionLabelItem] = pathname
      .replace("/sections/", "")
      .split("/");
  
    let sectionIndex = 0;
    let subSectionIndex = 0;
  
    const sectionFindIndex = sections.findIndex(
      ({ label }) => label === sectionLabelItem
    );
  
    if (sectionFindIndex !== -1) {
      sectionIndex = sectionFindIndex;
    }
  
    const subSectionFindIndex = subSections.findIndex(
      ({ label }) => label === subSectionLabelItem
    );
  
    if (subSectionFindIndex !== -1) {
      subSectionIndex = subSectionFindIndex;
    }
  
    const sectionLabel = sections[sectionIndex].label;
    const subSectionLabel = subSections[subSectionIndex].label;
  
    const gotoSection = (
      section = sectionLabel,
      subSection = subSectionLabel
    ) => {
      history.push(`/sections/${section}/${subSection}`);
    };
  
    return {
      gotoSection,
      sectionIndex,
      subSectionIndex,
      sectionLabel,
      subSectionLabel
    };
  }

  export function SiteDataProvider({ children }) {
    return (
      <SiteContext.Provider value={defaultData}>{children}</SiteContext.Provider>
    );
  }