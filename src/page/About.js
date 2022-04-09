import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useScrollFadeIn } from "help/customHooks";
import Section from "components/Section";
import Box from "@mui/material/Box";

const About = (props) => {
  const animatedItem = useScrollFadeIn();
  const animatedItem2 = useScrollFadeIn();
  const animatedItem3 = useScrollFadeIn();
  const animatedItem4 = useScrollFadeIn();
  const animatedItem5 = useScrollFadeIn();
  const animatedItem6 = useScrollFadeIn();

  return (
    <Stack
      mt={4}
      direction="column"
      sx={{ alignItems: "center", width: "100%", textAlign: "center" }}>
      <Section>
        <CardMedia
          {...animatedItem}
          component="img"
          image="https://i.pinimg.com/564x/5f/f1/e1/5ff1e13a12243507b209e11713264597.jpg"
          alt="image"
          sx={{ height: "auto", objectFit: "contain" }}
        />
      </Section>
      <Section>
        <Box sx={{ textAlign: "center" }} {...animatedItem2}>
          <Typography variant="h6" mt={2}>
            스키장을 갈까 말까 고민될 때
          </Typography>
          <Typography variant="h6" mt={2}>
            설질은 어떨지 궁금할 때
          </Typography>
        </Box>
      </Section>
      <Section mt={10}>
        <CardMedia
          {...animatedItem3}
          component="img"
          image="https://i.pinimg.com/564x/96/b6/04/96b6040be9d3bbd283bdec2970b0089c.jpg"
          alt="image"
          sx={{ height: "auto", objectFit: "contain" }}
        />
      </Section>
      <Section>
        <Box sx={{ textAlign: "center" }} {...animatedItem4}>
          <Typography variant="h6" mt={2}>
            매일 변화하는 설질
          </Typography>
          <Typography variant="h6" mt={2}>
            다른 라이더들의 리뷰를 보고 확인하세요
          </Typography>
        </Box>
      </Section>

      <Section mt={10}>
        <CardMedia
          {...animatedItem5}
          component="img"
          image="https://i.pinimg.com/564x/73/ff/a1/73ffa1fc45dc2283712fa4075582d8d7.jpg"
          alt="image"
          sx={{ height: "auto", objectFit: "contain" }}
        />
      </Section>
      <Section>
        <Box sx={{ textAlign: "center" }} {...animatedItem6}>
          <Typography variant="h6" mt={2}>
            이번 시즌 나의 하루하루의 기록을 남겨놓으세요.
          </Typography>
        </Box>
      </Section>
    </Stack>
  );
};

export default About;
