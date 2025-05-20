import React from "react";
interface SearchBarProps {
    handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    onSearch?: (term: string) => void | undefined;
}
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
