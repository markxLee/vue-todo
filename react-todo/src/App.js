import { Outlet, Link } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material/";

function App() {
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <ButtonGroup>
        <Button
          component={Link}
          to="/localStorage"
          variant="contained"
          color="success"
        >
          Local Storage
        </Button>
        <Button
          component={Link}
          to="/firestore"
          variant="contained"
          color="success"
          style={{
            marginLeft: "20px",
          }}
        >
          Fire Store
        </Button>
        <Button
          component={Link}
          to="/spring"
          variant="contained"
          color="success"
          style={{
            marginLeft: "20px",
          }}
        >
          Spring boot
        </Button>
      </ButtonGroup>
      <Outlet />
    </div>
  );
}

export default App;
