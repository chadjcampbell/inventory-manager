import { Box, Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchProps = {
  searchTerm: string;
  handleSearchChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
};

export default function Search({
  searchTerm,
  handleSearchChange,
}: SearchProps) {
  return (
    <Container>
      <Box
        sx={{
          marginBottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          type="search"
          label="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
}
