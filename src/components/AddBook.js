import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getAuthor,addBookMutation,getBooks} from '../queries/query';

class AddBook extends Component {

    constructor(props){
        super(props);
        this.state={
            name:"",
            genre:"",
            id_author_fk:"",
        }
    }

    displayAuthor(){
        var dt = this.props.getAuthorData;
        if(dt.loading){
            return (<option disabled>Loading...</option>);
        }else{
            return dt.authors.map(au => {
                return (<option key={au.id} value={au.id}>{ au.name }</option>);
            })
        }
    }

    submitAuthor(e){
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation({
            variables:{
                name : this.state.name,
                genre : this.state.genre,
                id_author_fk : this.state.id_author_fk,
            },
            refetchQueries: [{query:getBooks}]
        })  
    }

    render() {
        console.log(this.props);
        return (
            <div style={{marginTop:"50px"}}>
                <h1>Add Book</h1>
                <form onSubmit={this.submitAuthor.bind(this)}>
                    <label>
                        Name:
                    </label>
                    <br/>
                    <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
                    <br/>

                    <label>
                        Genre:
                    </label>
                    <br/>
                    <input type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
                    <br/>

                    <label>
                        Author:
                    </label>
                    <br/>
                    <select onChange={(e) => this.setState({id_author_fk:e.target.value})}>
                        <option>Select Author</option>
                        {this.displayAuthor()}
                    </select>
                    <br/>
                    <button style={{marginTop:"25px",width:"100px",height:"50px",fontSize:"16pt",backgroundColor:"#16a085",fontWeight:"bold",color:"white"}}>Add</button>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthor,{name:"getAuthorData"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);