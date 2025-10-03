import "../styles/Header.scss";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";
import { useSearch } from "../hooks";

/* */
import { useUnits } from "../hooks";

const Header = function () {
  /* input */
  const { query, handleChange, handleSubmit } = useSearch();

  const onSearch = (q: string) => {
    console.log("Searching for:", q);
    // TODO: Replace with your API call
  };
  /* input */ // redoooo
  const { isOpen, setIsOpen, wrapperRef } = useUnits();

  return (
    <header>
      <div className="heading_header">
        <img src={logo} alt="App Logo" />

        <div className="dropdown_wrapper" ref={wrapperRef}>
          <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <img src={unitsIcon} alt="Units" />
            <p>Units</p>
            <img src={dropdownIcon} alt="Arrow" />
          </div>

          {isOpen && (
            <ul className="dropdown_menu">
              <li>Metric</li>
              <li>Imperial</li>
            </ul>
          )}
        </div>
      </div>

      <p className="heading_tittle">
        How's the <br /> sky looking <br />
        today?
      </p>

      <form onSubmit={handleSubmit(onSearch)} className="search_form">
        <div className="input_wrapper">
          <img src={search} alt="" className="search_icon" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a place..."
            name="place"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      <div className="weather_overview">
        <p className="weather_area">Berlin, Germany</p>
        <p className="weather_date">Tuesday, Aug 5, 2025</p>
      </div>

      <div className="weather_stats">
        <div className="first_block">
          <div className="stats_card first_child">
            <p className="stats_tittle">Feels Like</p>
            <p className="stats_content">18</p>
          </div>
          <div className="stats_card first_child">
            <p className="stats_tittle">Humidity</p>
            <p className="stats_content">46%</p>
          </div>
        </div>

        <div className="second_block">
          <div className="stats_card second_child">
            <p className="stats_tittle">Wind</p>
            <p className="stats_content">14 Km/h</p>
          </div>
          <div className="stats_card second_child">
            <p className="stats_tittle">Precipitation</p>
            <p className="stats_content">0 mm</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
