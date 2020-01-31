import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import {getBooks,deleteBookMutation} from '../queries/query';
import {flowRight as compose} from 'lodash';
import EditBook from '../components/EditBook';

class BookList extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected:null
        }
    }

    displayBooks(){
        var dt = this.props.getBooks;
        if(dt.loading){
            return(<div>Loading.....</div>);
        }else{
            if(dt.error){
                return(<div>Tidak Ada Data</div>);
            }
            return dt.get_data_book.map(book => {
                return(
                    <li>
                        {book.name} - {book.genre} (Author: {book.list_author[0].name}, Age: {book.list_author[0].age} )
                        <button onClick={() => {this.editBooks(book.id)}}>Edit Book</button>
                        <button onClick={() => {if(window.confirm('Delete the item?')){this.deleteBooks(book.id)};}}>Delete Book</button>
                    </li>
                )
            })
        }
    }

    editBooks(idval){
        this.setState({
            selected:idval
        })
    }

    deleteBooks(idval){
        this.props.deleteBookMutation({
            variables:{
                id : idval,
            },
            refetchQueries: [{query:getBooks}]
        })
    }

    render(){
        return(
            <div style={{left:"0", lineHeight:"40px", backgroundColor:"#e0e0e0"}}>
                <h1>List Book</h1>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <EditBook bookID={this.state.selected}/>
            </div>
        )
    }
}

export default compose(
    graphql(getBooks,{name:"getBooks"}),
    graphql(deleteBookMutation,{name:"deleteBookMutation"})
)(BookList);