import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import HomePage from "../App";
// import Toolbar from "./Toolbar";
// import Sections from "./Sections";
import { SiteDataProvider } from "./SiteContext";
import { BookReview } from "./BookReviews";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#88333d",
    },
    secondary: {
      main: "#08495d",
    },
    typography: {
      fontWeight: 650,
    },
  },
});

function App() {
  return (
    <SiteDataProvider>
      <MuiThemeProvider theme={outerTheme}>
        <Router>

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            {/* <Route path="/sections">
              {hasResults ? (
                <SearchResults searchResults={searchResults} />
              ) : (
                <Sections />
              )}
            </Route> */}

            <Route path="/">
              <div>Top of the slide</div>
              {/* <HomePage /> */}
              {/* <BooksCard /> */}
              <BookReview />
              {/* <Quote /> */}
              {/* <GetOrganized /> */}
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </SiteDataProvider>
  );
}

export default App;
