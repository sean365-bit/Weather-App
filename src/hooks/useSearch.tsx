import { useState } from "react";

export function useSearch() {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit =
    (callback: (q: string) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      callback(query.trim());
      setQuery(""); // optional: clear input after submit
    };

  return {
    query,
    setQuery,
    handleChange,
    handleSubmit,
  };
}
