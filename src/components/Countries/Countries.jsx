import PropTypes from "prop-types";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/styles.css";
import CountriesCards from "./CountriesCards";
import data from "../../../data.json";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Countries({ mode }) {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchInput, setSearchInput] = useState(undefined);

  function handleRegionChange(e) {
    const name = e.target.value;
    setSelectedRegion(name);
  }

  function handleSearchInput(e, newInput) {
    setSearchInput(newInput);
  }

  const filteredData = data.filter((item) => {
    return selectedRegion ? item.region === selectedRegion : data;
  });

  const filteredDataBySearch = searchInput
    ? filteredData.filter((item) =>
        item.name?.toLowerCase().includes(searchInput?.toLowerCase())
      )
    : filteredData;

  return (
    <main className={`containerBody ${mode}`}>
      <section className={`countriesDisplay ${mode}`}>
        <div className="searchContainer">
          <Autocomplete
            data={data}
            freeSolo
            options={filteredData.map((item) => item.name)}
            inputValue={searchInput}
            onInputChange={handleSearchInput}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              const country = data.find((item) => item.name === option);
              if (!country) return null; // Handle cases where country is not found
              return (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w40/${country.alpha2Code?.toLowerCase()}.png`}
                    alt={`${country.alpha2Code}`}
                  />
                  {option}
                </Box>
              );
            }}
            sx={{
              width: { xs: "90vw", md: 450 },
              backgroundColor:
                mode === "light"
                  ? "var(--lightMode-Elements)"
                  : "var(--darkMode-Elements)",
              borderRadius: "5px",
              "& input": {
                color:
                  mode === "light"
                    ? "var(--lightMode-Text)"
                    : "var(--darkMode-Text)",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a country..."
                InputLabelProps={{
                  style: {
                    color:
                      mode === "light"
                        ? "var(--lightMode-Text)"
                        : "var(--darkMode-Text)",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color:
                            mode === "light"
                              ? "var(--lightMode-Text)"
                              : "var(--darkMode-Text)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <FormControl>
          <InputLabel
            sx={{
              color:
                mode === "light"
                  ? "var(--lightMode-Text)"
                  : "var(--darkMode-Text)",
            }}
          >
            Filter by Region
          </InputLabel>
          <Select
            label="Filter by Region"
            IconComponent={() => (
              <ArrowDropDownIcon
                style={{
                  color:
                    mode === "light"
                      ? "var(--lightMode-Text)"
                      : "var(--darkMode-Text)",
                }}
              />
            )}
            onChange={handleRegionChange}
            value={selectedRegion}
            sx={{
              width: 170,
              backgroundColor:
                mode === "light"
                  ? "var(--lightMode-Elements)"
                  : "var(--darkMode-Elements)",
              borderRadius: "5px",
              color:
                mode === "light"
                  ? "var(--lightMode-Text)"
                  : "var(--darkMode-Text)",
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="America">America</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </section>
      <CountriesCards mode={mode} filteredDataBySearch={filteredDataBySearch} />
    </main>
  );
}

Countries.propTypes = {
  mode: PropTypes.string.isRequired,
};
