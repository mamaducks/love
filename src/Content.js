import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Link,
  Image,
  Paper,
  Typography
} from "@material-ui/core";
import { useSelectedSections, useSite } from "./SiteContext";
import { getComponentItemToRender } from "./Section";
import { TiArrowRightThick } from "react-icons/ti";
// import { IconContext } from "react-icons";
import { GrView } from "react-icons/gr";
import {IoMdOpen} from "react-icons/io"


function useTopPicks() {
    const { sections, subSections } = useSite();
  
    const topPicks = sections.map(section => {
      const sectionLabel = section.label;
  
      const subSectionTopPicks = subSections.map(subSection => {
        const subSectionLabel = subSection.label;
        const [topPick] = section.subSections[subSection.field].sort((a, b) => {
          const ratingA = a.rating || 1;
          const ratingB = b.rating || 1;
  
          return ratingB - ratingA;
        });
        return { subSectionLabel, topPick };
      });
  
      return { subSectionTopPicks, sectionLabel };
    });
  
    console.log(topPicks);
  
    return topPicks;
  }
  
  function TopPicks({ classes, topPickItem, setSelectedItem }) {
    const { sectionLabel, subSectionTopPicks } = topPickItem;
  
    return (
      <>
        <ContentHeader name={sectionLabel} />
  
        <div className={classes.cardLayout}>
          {subSectionTopPicks.map(subSection => (
            <ContentBody
              setSelectedItem={setSelectedItem}
              sectionLabel={sectionLabel}
              subTopPick={subSection}
            />
          ))}
        </div>
      </>
    );
  }


export function ContentHeader({ name }) {
    // const classes = useStyles();
  
    return (
      <Paper >
        <Grid  item xs={12}>
          <Grid item xs={12}>
            <Typography >{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button >
              View More
              <Link >
                <TiArrowRightThick size={24} />
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  
  export function ContentBody({ setSelectedItem, sectionLabel, subTopPick }) {
    // const classes = useCardStyles();
    const { subSectionLabel, topPick } = subTopPick;
    const { gotoSection } = useSelectedSections();
  
    const onTakeALookClick = () => {
      // this will set selected item
      setSelectedItem({ sectionLabel, subSectionLabel, topPick });
    };
  
    const onGotoClick = () => {
      // this will take to page
      gotoSection(sectionLabel, subSectionLabel);
    };
  
    return (
      <Card >
        <div>
          <CardMedia
            // className={classes.icon}
            image={`/${topPick.imgUrl}`}
          ></CardMedia>
          <CardContent>
            <Typography  variant="h8"></Typography>
  
            <div>
              <Typography gutterBottom variant="body2" color="textSecondary">
                {subSectionLabel}
              </Typography>
            </div>
            <Button
              size="small"
              color="secondary"
              target="_blank"
              onClick={onTakeALookClick}
            >
              Quick View
              <GrView />
            </Button>
  
            <Button
              size="small"
              color="secondary"
              target="_blank"
              onClick={onGotoClick}
            >
              Goto Section
              <IoMdOpen />
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }

  export function HomePage() {
    // const classes = useStyles();
    const topPicks = useTopPicks();
    const [selectedItem, setSelectedItem] = useState();
    const { sections } = useSite();
    const { gotoSection } = useSelectedSections();
  
    return (
      <>
        {!!selectedItem && (
          <Dialog open maxWidth="sm" onClose={() => setSelectedItem(undefined)}>
            {getComponentItemToRender(
              selectedItem.subSectionLabel,
              selectedItem.topPick
            )}
          </Dialog>
        )}
  
        <Container>
          <Paper 
        //   className={classes.paper}
          >
            <Typography 
            // className={classes.explore}
            >Explore</Typography>
            <div 
            // className={classes.imagesBox}
            >
              {sections.map(({ imgUrl, label }) => (
                <Card 
                // className={classes.root}
                >
                  <CardActionArea
                    // className={classes.action}
                    onClick={() => gotoSection(label)}
                  >
                    <CardMedia 
                    // className={classes.root} 
                    image={`/${imgUrl}`} />
  
                    <span 
                    // className={classes.homeLabel}
                    >{label}</span>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </Paper>
          <Typography 
        //   className={classes.header}
          >Some Places to Start</Typography>
          <Container>
            {topPicks.map(topPick => (
              <TopPicks
                // classes={classes}
                setSelectedItem={setSelectedItem}
                topPickItem={topPick}
              />
            ))}
          </Container>
          <div>foot</div>
        </Container>
      </>
    );
  }