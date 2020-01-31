import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthor, getBookDetail, getBooks, editBookMutation} from '../queries/query';
import {flowRight as compose} from 'lodash';

class EditBook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:false,
            genre:false,
            id_author_fk:false,
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

    submitEditBook(e){
        e.preventDefault();
        this.props.editBookMutation({
            variables:{
                id : this.props.bookID,
                name : this.state.name ? this.state.name : this.props.getBookDetail.get_data_book_detail.name,
                genre : this.state.genre ? this.state.genre : this.props.getBookDetail.get_data_book_detail.genre,
                id_author_fk : this.state.id_author_fk ? this.state.id_author_fk : this.props.getBookDetail.get_data_book_detail.id_author_fk,
            },
            refetchQueries: [{query:getBooks}]
        })  
    }

    render() {
        console.log(this.state);
        if(this.props.bookID != null){
            if(this.props.getBookDetail.loading){
                return (<div>Loading....</div>)
            }else{
                return (
                    <div style={{marginTop:"50px"}}>
                        <h1>Edit Book</h1>
                        <form onSubmit={this.submitEditBook.bind(this)}>
                            <label>
                                Name:
                            </label>
                            <br/>
                            <input type="text" onChange={(e) => this.setState({name:e.target.value})} defaultValue={this.props.getBookDetail.get_data_book_detail.name}/>
                            <br/>
                            <label>
                                Genre:
                            </label>
                            <br/>
                            <input type="text" onChange={(e) => this.setState({genre:e.target.value})} defaultValue={this.props.getBookDetail.get_data_book_detail.genre}/>
                            <br/>
                            <label>
                                Author:
                            </label>
                            <br/>
                            <select onChange={(e) => this.setState({id_author_fk:e.target.value})} defaultValue={this.props.getBookDetail.get_data_book_detail.list_author[0].id}>
                                <option>Select Author</option>
                                {this.displayAuthor()}
                            </select>
                            <br/>
                            <button style={{marginTop:"25px",width:"100px",height:"50px",fontSize:"16pt",backgroundColor:"#16a085",fontWeight:"bold",color:"white"}}>Edit</button>
                        </form>
                    </div>
                ); 
            }
            
        }else{
            return (null);
        }
        
    }
}

export default compose(
    graphql(getAuthor,{name:"getAuthorData"}),
    graphql(getBooks,{name:"getBooks"}),
    graphql(editBookMutation,{name:"editBookMutation"}),
    graphql(getBookDetail,{name:"getBookDetail",
    options:(props)=>{
        return {
            variables:{
                id : props.bookID
            }
        }
    }
})
)(EditBook);