import { Check } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

const PricingCard = ({
  plan,
  annualPrice,
  monthlyPrice,
  features,
  isAnnual,
  buttonText,
}) => {
  const price = isAnnual ? annualPrice : monthlyPrice;

  return (
    <>
      <Card
        elevation={6}
        sx={{
          width: "300px",
          height: "auto",
          // backgroundColor: "#0560fd",
          // backgroundColor: "#0093E9",
          // backgroundImage: "linear-gradient(91deg, #0093E9 0%, #80D0C7 100%)",
          backgroundColor: "transparent",

          color: "black",
          padding: "20px",
          display: "flex",

          flexDirection: "column",
          justifyContent: "justify-between",
          borderRadius: "20px",
          border: "1px solid transparent",
          transition: "border-color 0.3s ease",

              
          "&:hover": {
            borderColor: "#034aac",
          },


        }}
      >
        <CardContent
          sx={{
            padding: "0px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
            //   color: "#ffffff",
            //   backgroundColor: "#FBAB7E",
            //   backgroundImage:
            //     "linear-gradient(to bottom right, #FF5722, #F50057)",
            //   // backgroundColor: "#0560fd",

            //   width: "fit-content",
            //   borderRadius: "10px",
            //   padding: "8px",
            //   fontSize: "1rem",

            color: "#ffffff",
            backgroundColor: "#034aac",
            // backgroundImage:
            //   "linear-gradient(to bottom right, #FF5722, #F50057)",

            width: "fit-content",
            borderRadius: "10px",
            paddingX: "1rem",
            paddingY: "0.5rem",

            fontSize: "1rem",
            }}
            component="h2"
            gutterBottom
          >
            {plan}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "2rem",
              color: "black",
              fontWeight: "900",
              display: "flex",
              justifyContent: "center",
            }}
            gutterBottom
          >
            ₹{price}
          </Typography>

          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingY: "2.5rem",
            }}
          >
            {features.map((feature, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {
                  <Check
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#41df7d ",
                      borderRadius: "100%",
                      fontSize: "1.2rem",
                    }}
                  />
                }
                {feature}
              </ListItem>
            ))}
          </List>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#034aac",
                color: "white",
                borderRadius: "20px",
                padding: "10px",
                fontSize: "1rem",
                fontWeight: "500",
                "&:hover": {
                  backgroundColor: "#635bff",
                },
              
              }}
              fullWidth
            >
              {buttonText}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

PricingCard.propTypes = {
  plan: PropTypes.string.isRequired,
  annualPrice: PropTypes.number.isRequired,
  monthlyPrice: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAnnual: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PricingCard;
