import './Branches.css';
import React, {useEffect, useState} from 'react';
import { Select, 
         InputLabel, 
         FormControl, 
         FormControlLabel, 
         Button, 
         Typography, 
         OutlinedInput, 
         Checkbox, 
         CircularProgress 
        } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { SearchSharp, NavigateBeforeSharp, NavigateNextSharp, Favorite, FavoriteBorder} from '@material-ui/icons';
import Grid from "@material-ui/core/Grid";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#282c34',
      color: 'wheat',
      fontSize: 18,
      fontWeight: "bold"

    },
    body: {
      fontSize: 18,
    },
  }))(TableCell);

export default function Branches() {

    const classes = useStyles();
    
    let [city, setCity] = useState("BANGALORE");
    let [query, setQuery] = useState("");
    let [currentPage, setcurrentPage] = useState(1);
    let [page_size,setPageSize]=useState(10);

    let [data, setData] = useState([]);
    let [isLastPage,setIsLastPage] = useState(false);
    let [isFav,setFav]=useState(new Map());
    let [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        let offset=(currentPage-1)*page_size
        fetch(`http://cors-anywhere.herokuapp.com/https://bankofindia-backend.herokuapp.com/api/branches?q=${city}&limit=${page_size}&offset=${offset}`).then((res) => {

            return res.json();
        }).then((res) => {
            setData(res);

            for(let i=0;i<localStorage.length;i++)
                isFav[localStorage.key(i)]=true;

            setIsLastPage(res.length === 0?true:false);
            setisLoading(false);
        })
        
    }, [currentPage,page_size,city, isFav]);

    function handleChange(event){
        event.preventDefault();
        if(event.target.name === "city"){
            setCity(event.target.value);
        }else if(event.target.name === "query"){
            setQuery(event.target.value);
        }else if(event.target.name === "page-size"){
            setPageSize(event.target.value);
        }
    }

    function nextPage(event) {
        event.preventDefault();
        if(isLastPage === false){
            setcurrentPage(currentPage+1);
        }
    }

    function  previousPage(event) {
        event.preventDefault();
        if(currentPage>1){
            setcurrentPage(currentPage-1);
        }
    }

    function handleClick(event){
        event.preventDefault();
        if(localStorage.getItem(event.target.name)){
            localStorage.removeItem(event.target.name);
        }else{
            localStorage.setItem(event.target.name,true);
        }
        let localMap=Object.assign(new Map(),isFav);
        localMap[event.target.name]=false;
        setFav(localMap);
    }

    function isfavorite(id){
        return (<FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} 
                    checkedIcon={<Favorite />} 
                    checked={localStorage.getItem(id)?true:false} 
                    name={id} 
                    onChange={handleClick} />}
                />)
    }

    return (
        <React.Fragment>
            <div className="query_bar">
                <Grid container alignItems="center" justify="center">
                    <Grid
                        item
                        container
                        alignItems="center"
                        justify="center"
                        xs={6}
                        style={{ minHeight: "100px" }}
                        >
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="city_name">City</InputLabel>
                            <Select
                                native
                                value={city}
                                onChange={handleChange}
                                label="City"
                                inputProps={{
                                    name: 'city',
                                    id: 'city_name',
                                }}
                                >
                                <option value="AHMEDABAD">AHMEDABAD</option>
                                <option value="BANGALORE">BANGALORE</option>
                                <option value="MUMBAI">MUMBAI</option>
                                <option value="PUNE">PUNE</option>
                                <option value="SURAT">SURAT</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems="center"
                        justify="flex-start"
                        xs={6}
                        style={{ minHeight: "100px" }}
                        >          
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="query">Search</InputLabel>
                            <OutlinedInput
                                inputProps={{
                                    name: 'query',
                                    id: 'query',
                                }}
                                value={query}
                                onChange={handleChange}
                                startAdornment={<SearchSharp />}
                                labelWidth={60}
                                style={{ width: "60%" }}

                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div className="paginator">
                <Grid container alignItems="center" justify="center">
                    <Grid 
                        container
                        item
                        alignItems="center"
                        justify="flex-end"
                        xs={2}
                        style={{ minHeight: "100px" }}
                    >
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="page-size">Page size</InputLabel>
                            <Select
                                native
                                value={page_size}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'page-size',
                                    id: 'page-size',
                                }}
                                >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid 
                        container
                        item
                        alignItems="center"
                        justify="flex-end"
                        xs={2}
                        style={{ minHeight: "100px" }}
                    >
                        <Button disabled={currentPage<=1} onClick={previousPage} variant="contained" startIcon={<NavigateBeforeSharp/>}>
                            Back
                        </Button>
                    </Grid>
                    <Grid 
                        container
                        item
                        alignItems="center"
                        justify="center"
                        xs={6}
                        style={{ minHeight: "100px" }}
                    >
                        <Typography variant="h5">Current Page:- {currentPage}</Typography>
                    </Grid>
                    <Grid 
                        item
                        container
                        alignItems="center"
                        justify="flex-start"
                        xs={2}
                        style={{ minHeight: "100px" }}
                    >
                        <Button onClick={nextPage} variant="contained" endIcon={<NavigateNextSharp/>}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div className="table">
            {
                isLoading?(
                    <CircularProgress style={{'color': 'black'}}/>
                ):(
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Bank Name</StyledTableCell>
                            <StyledTableCell>Branch Name</StyledTableCell>
                            <StyledTableCell>IFSC</StyledTableCell>
                            <StyledTableCell>CITY</StyledTableCell>
                            <StyledTableCell align="center">Favorite</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.filter((row) => {
                                    if (query === null || query === "") 
                                        return row;
                                    else if (row.ifsc.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
                                            row.branch.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
                                            row.address.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
                                            row.city.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
                                            row.district.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
                                            row.bank_name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
                                            row.state.toLocaleLowerCase().includes(query.toLocaleLowerCase())) 
                                        return row;
                                }).map((row) => {
                                    return (

                                        <TableRow key={row.ifsc}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.bank_name}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.branch}</StyledTableCell>
                                        <StyledTableCell>{row.ifsc}</StyledTableCell>
                                        <StyledTableCell>{row.city}</StyledTableCell>
                                        <StyledTableCell align="center">{isfavorite(row.ifsc)}</StyledTableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            </div>
        </React.Fragment>
    );
}