const { styled } = require('@mui/material/styles');
const { Grid } = require('@mui/material');

const CardContent = styled(Grid)({
  padding: '10px',
  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  border: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.4)',
  },
});

export default CardContent;
