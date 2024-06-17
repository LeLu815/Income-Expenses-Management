import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Loading({ children }) {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0">
      <div className="w-full h-full blur-sm bg-white opacity-60">
        {children}
      </div>
      <div className="absolute top-2/4 left-2/4 translate-2/4 ">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    </div>
  );
}

export default Loading;
