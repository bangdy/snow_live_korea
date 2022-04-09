import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Container = styled((props) => {
  const { ...other } = props;
  return <Box {...other} />;
})(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

const Wrapper = styled((props) => {
  const { ...other } = props;
  return <Box {...other} />;
})(({ theme }) => ({
  height: "100%",
}));

const Section = (props) => {
  const { children, ...other } = props;

  return (
    <Container {...other}>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Section;
