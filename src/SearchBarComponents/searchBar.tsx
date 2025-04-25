import React from "react";

interface SearchBarProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onSearch?: (term: string) => void | undefined;
}
interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { value: string };
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }: SearchBarProps) => {
  const [term, setTerm] = React.useState<string>(""); // State to hold the search term

  const handleChange = (event: ChangeEvent): void => {
    setTerm(event.target.value); // Update the search term in the parent component
    console.log("Search term changed: ", event.target.value); // Log the search term to the console
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search term submitted: ", term);
    if (onSearch && term) {
      onSearch(term); // Call the onSearch function with the search term
    }
  };

  return (
    <div className="input-group input-group-lg mb-3 badge">
      <label htmlFor="searchBar" className="input-group mb-2">
        <form onSubmit={handleSubmit} className="input-group mb-3">
          <input
            id="searchBar"
            type="text"
            name="searchBar"
            onChange={handleChange}
            value={term}
            className="form-control"
            placeholder="Search for Song, Artist, Album"
          />
          <button type="submit" className="btn btn-outline-secondary">
            Search
          </button>
        </form>
      </label>
    </div>
  );
};

export default SearchBar;
