import React from "react";
import { ThemeConsumer } from "../../Context/theme";
import { LangContext } from "../../Context/langContext";
import { Grid, Typography, InputBase } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import classes from "./index.module.scss";
import MaxWidth from "../MaxWidth";
import Switch from "@material-ui/core/Switch";
import { Link, BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }
  render() {
    const { componentID, searchHandler } = this.props;
    const uniqueId = componentID + "_header";
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          return (
            <LangContext.Consumer>
              {
                ({ toggleLangDropdown }) => {
                  return <>
                    <header
                      className={`${uniqueId} header ${classes.Header}`}
                      id={`${uniqueId}`}
                      style={{
                        background: theme.background,
                        color: theme.foreground,
                      }}
                    >
                      <MaxWidth componentID={uniqueId}>
                        <Grid
                          className={classes.HeaderContent}
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                        >
                          <Grid
                            item
                            xs={3}
                            sm={3}
                            md={4}
                            container
                            alignItems="center"
                            justify="flex-start"
                          >
                            <DashboardIcon
                              fontSize="default"
                              color="secondary"
                              className={`${classes.DashboardIcon}`}
                              onClick={toggleLangDropdown}
                            />
                            <BrowserRouter>
                              <Link to="/" className={`${classes.SiteLogo}`}>
                                <Typography
                                  component="h1"
                                  align="center"
                                  color="secondary"
                                  className="font fontBlack fontSize_md"
                                >
                                  Cards
                                </Typography>
                              </Link>
                            </BrowserRouter>
                          </Grid>
                          <Grid
                            item
                            xs={7}
                            sm={6}
                            md={4}
                            container
                            alignItems="center"
                            justify="center"
                          >
                            {searchHandler ? (
                              <InputBase
                                className={classes.SearchInput}
                                placeholder="Search Cards"
                                inputProps={{ "aria-label": "Search Cards" }}
                                value={this.state.searchText}
                                onChange={(event) =>
                                  this.setState(
                                    {
                                      searchText: event.target.value,
                                    },
                                    () => {
                                      if (this.state.searchText === "") {
                                        searchHandler(null, "name");
                                      }
                                    }
                                  )
                                }
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") {
                                    searchHandler(this.state.searchText, "name");
                                  }
                                }}
                              />
                            ) : null}
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={3}
                            md={4}
                            container
                            alignItems="center"
                            justify="flex-end"
                          >
                            <Switch
                              checked={theme.mode === "dark"}
                              onChange={toggleTheme}
                              name="ToggleTheme"
                              color={theme.mode === "dark" ? "secondary" : "primary"}
                              inputProps={{
                                "aria-label": `Select ${theme.mode === "dark" ? "light" : "dark"
                                  } Mode`,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </MaxWidth>
                    </header>
                  </>
                }
              }
            </LangContext.Consumer>
          );
        }}
      </ThemeConsumer>
    );
  }
}

Header.propTypes = {
  componentID: PropTypes.string.isRequired,
  searchHandler: PropTypes.func,
};

export default Header;
