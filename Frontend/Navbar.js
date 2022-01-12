import React, {
  useState,
  useRef,
  forwardRef,
  createRef,
  useEffect,
} from 'react';

// import './style.css';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import styled, { css } from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '../Frontend/Input';
import { fetchSpaces } from '../Backend/remote';
import Dashboard from '../Frontend/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles({
  btn: {
    backgroundColor: 'rose',
  },
});
const Navbar = () => {
  const classes = useStyles();
  let nobref = useRef(null);
  const BirdsInput = forwardRef((props, ref) => (
    //<Input ref={ref} {...props} />
    <input
      ref={ref}
      type="number"
      id="outlined-basic"
      label="BIRDS"
      variant="outlined"
      required
    />
  ));
  const handleSubmit = (e) => {
    /* console.log(nobref);
  alert(nobref.current.value);
  return false;*/
    /*
  fetchSpaces((data) => {
    console.log(data.spaces);
    // alert('hi');
    setSpaces(data.spaces);
  });*/
    //return false;

    setNumberOfBirds(nobref.current.value);

    setValue(1);
    e.preventDefault();
  };
  const theme = useTheme();
  const handleInputSubmit = (e) => {
    alert(selectedSpaceId);
    alert(pointref.current.value);
  };

  const Button = styled.button`
     background: transparent;
     border-radius: 3px;
     border: 2px solid palevioletred;
     color: palevioletred;
     margin: 0.5em 1em;
     padding: 0.25em 1em;

     ${(props) =>
       props.primary &&
       css`
       background: palevioletred;
       color: white;
     `}
   `;

  const [value, setValue] = useState(0);
  let [numberOfBirds, setNumberOfBirds] = useState(0);
  let [spaces, setSpaces] = useState([]);
  let [points, setPoints] = useState([]);
  let [selectedSpace, setSelectedSpace] = useState('');
  let [selectedSpaceId, setSelectedSpaceId] = useState('');

  const PoinInput = forwardRef((props, ref) => (
    //<Input ref={ref} {...props} />
    <input
      ref={ref}
      type="text"
      id="outlined-basic"
      label="BIRDS"
      variant="outlined"
      required
    />
  ));
  //const nobref = createRef();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleSpaceChange = (e) => {
    //alert(e.target.value);
    var spaceId = e.target.value;
    for (var i = 0; i < spaces.length; i++) {
      if (spaces[i].id == spaceId) {
        setPoints(spaces[i].points);
        //setSelectedSpace('Points for ' + spaces[i].name + ' : ');
        setSelectedSpace(spaces[i].name);
        setSelectedSpaceId(spaces[i].id);
        break;
      }
    }
  };
  const spaceList = spaces.map((space) => (
    <li key={space.id}>
      <input
        style={{ paddingLeft: 'none' }}
        id={space.id}
        value={space.id}
        name="space"
        type="radio"
        onChange={handleSpaceChange}
      />
      {space.name}
    </li>
  ));

  const pointsList = points.map((point) => (
    <li key={point.id}>{point.name}</li>
  ));
  const MySpaceLbel = () => {
    if (selectedSpace) return <h5>Points for {selectedSpace}:</h5>;
    else return <p></p>;
  };
  const MyPointsInput = () => {
    if (selectedSpace)
      return (
        <form onSubmit={handleInputSubmit}>
          <h5>Add New Point for {selectedSpace}</h5>
          Point Name <PoinInput ref={pointref} />
          <Button
            primary
            // className={classes.btn}
            type="submit"
            color="primary"
            variant="Contained"
          >
            Save
          </Button>
        </form>
      );
    else return <p></p>;
  };
  useEffect(() => {
    fetchSpaces((data) => {
      console.log(data.spaces);
      // alert('hi');
      setSpaces(data.spaces);
    });
  }, []);

  return (
    <nav className="navbar">
      <Box sx={{ bgcolor: 'background.paper', flexGrow: 1 }}>
        <AppBar position="static">
          <Typography variant="h6" color="inherit" component="div">
            <Tabs
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Input" {...a11yProps(0)} />
              <Tab label="Dashboard" {...a11yProps(1)} />
            </Tabs>
          </Typography>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Input />
            <center>
              <form onSubmit={handleSubmit}>
                <BirdsInput ref={nobref} />
                <Button
                  primary
                  className={classes.btn}
                  id="outlined-basic"
                  label="BIRDS"
                  type="submit"
                  color="primary"
                  variant="outlined"
                >
                  SEND
                </Button>
              </form>
            </center>
            <hr />

            <FormControl component="fieldset">
              <FormLabel component="legend">Leiacafe</FormLabel>
              <RadioGroup
                aria-label="leiacafe"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <ol>{spaceList}</ol>
                <MySpaceLbel></MySpaceLbel>
                <ol>{pointsList}</ol>
              </RadioGroup>
            </FormControl>

            {/* <ol>{spaceList}</ol>
            <MySpaceLbel></MySpaceLbel>
            <ol>{pointsList}</ol> */}
          </TabPanel>
          <TabPanel value={1} index={1} dir={theme.direction}>
            Last 10 values
            <Dashboard nob={numberOfBirds} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </nav>
  );
};

export default Navbar;
