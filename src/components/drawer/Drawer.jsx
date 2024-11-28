import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../slices/add-cart/addCartSlice";


const Offcanvas = (props) => {
  const { open, toggleDrawer } = props;
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();




  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 500 }} className="container" role="presentation">
          <Box className="d-flex justify-content-between align-items-center mt-3">
            <Typography
              variant="h5"
              color="black"
              sx={{ marginLeft: "2%", marginTop: "2%" }}
            >
              Cart
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={toggleDrawer(false)}
            />
          </Box>
          <Divider component="li" className="list-unstyled mt-2" />

          <Box className="d-flex flex-column justify-content-between h-100 mt-5">
            {cart?.map((items, index) => {
              return (
                <Card key={index}>
                  <Box className="d-flex justify-content-between align-items-center p-3">
                    <img
                      src={items.image}
                      className="img-fluid w-25 me-2 h-25"
                      alt=""
                    />
                    <Box className="d-flex justify-content-between w-100 flex-column">
                      <Typography variant="body1" color="black">
                        {items.title}
                      </Typography>
                      <Typography variant="body2" color="black">
                        ${items.price}
                      </Typography>
                      
                    </Box>
                    <div className="input-group ">
                        <button
                        className="input-group-text"
                          onClick={() => dispatch(increaseQuantity(items.id))}
                        >
                          +
                        </button>
                        <Typography className="input-group-text" variant="p" color="initial">
                          {items.quantity}
                        </Typography>
                        <button
                        className="input-group-text"
                          onClick={() => dispatch(decreaseQuantity(items.id))}
                        >
                          -
                        </button>
                      </div>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Offcanvas;
