import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { useSelectedSections, useSite } from "./SiteContext";
import BookReviews, { BookReview } from "./BookReviews";
import Organize from "./Organize";
import Quote from "./Quote";
import Sites, { Site } from "./Sites";
import TabPanel from "./TabPanel";
import { GetMenuIcon, getSubMenuIcon as subTabIcon } from "./Accordion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
    marginTop: 40,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: 20,
    flexShrink: 0,
    marginTop: 20,
  },
  tabsLabel: {
    color: theme.palette.secondary.main,
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
    display: "flex",
    size: "20px",
  },
  i: {
    color: "#4c8490",
    width: "125px",
    display: "flex",
    justifyContent: "space-between",
  },
  headLabel: {
    color: "azure",
  },
  menuRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
}));

export function getComponentToRender(
  selectedSection,
  { field },
  isForSearch = false
) {
  const subSectionData = selectedSection.subSections[field];

  switch (field) {
    case "bookReviews":
      return <BookReviews data={subSectionData} isForSearch={isForSearch} />;

    case "sites":
      return <Sites data={subSectionData} isForSearch={isForSearch} />;

    // case "quotes":
    //   return <Quotes data={subSectionData} isForSearch={isForSearch} />;

    // case "organize":
    //   return <Organizes data={subSectionData} isForSearch={isForSearch} />;

    default:
      return <div>Under Construction</div>;
  }
}

export function getComponentItemToRender(subSectionLabel, item) {
  switch (subSectionLabel) {
    case "Books":
      return <BookReview {...item} />;

    case "Sites":
      return <Site {...item} />;

    case "Quotes":
      return <Quote {...item} />;

    case "Organize":
      return <Organize {...item} />;

    default:
      return <div>Under Construction</div>;
  }
}

export const Section = ({ selectedSection }) => {
  const classes = useStyles();
  const { subSections } = useSite();

  const { subSectionIndex, sectionLabel, gotoSection } = useSelectedSections();
  const [selectedTab, setSelectedTab] = useState(subSectionIndex);

  useEffect(() => {
    setSelectedTab(subSectionIndex);
  }, [subSectionIndex]);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        className={classes.tabs}
      >
        {subSections.map((subSection) => (
          <div className={classes.menuRow}>
            {" "}
            {subTabIcon(subSection.label)}
            <Tab
              onClick={() => gotoSection(sectionLabel, subSection.label)}
              className={classes.tabsLabel}
              label={subSection.label}
            >
              {subSection.label}
            </Tab>
          </div>
        ))}
      </Tabs>

      {subSections.map((subSection, index) => (
        <TabPanel value={selectedTab} index={index}>
          <>
            {getComponentToRender(selectedSection, subSection)}

            <Comments
              storageKey={`${selectedSection.label}-${subSection.label}`}
              comments={selectedSection.comments[subSection.field]}
            />
          </>
        </TabPanel>
      ))}
    </div>
  );
};