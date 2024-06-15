import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router";

function NotFount() {
  const navigate = useNavigate();
  const params = useParams();
  const urlPath = params["*"];

  const handleClickHome = () => {
    return navigate("/");
  };
  return (
    <Box sx={{ minWidth: 475 }}>
      <Card className="p-4">
        <CardContent className="flex flex-col gap-8">
          <Typography variant="h4" component="div">
            페이지를 찾을 수 없습니다. :(
          </Typography>
          <div className="flex gap-2 justify-center items-center">
            <Typography className="">검색하신 경로 :</Typography>
            <div className="text-2xl font-semibold">{'"' + urlPath + '"'}</div>
          </div>
          <p>검색하신 경로가 맞으신가요? 다시 한번 확인해주세요!</p>
          <CardActions className="flex justify-center">
            <Button
              onClick={handleClickHome}
              className="w-[180px]"
              variant="contained"
            >
              홈으로 돌아가기
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NotFount;
