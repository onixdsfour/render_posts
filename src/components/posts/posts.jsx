import React, { Component } from 'react';
import './posts.css';
import JsonPlaceHolder from '../../services/JsonPlaceHolder';
import FormAddPost from '../form-Add/form-add-post';
import FormEditPost from '../form-edit/form-edit-post';


class Posts extends Component {
    
    state = {
        posts : [],  
        newPostTitle: undefined,
        newPostBody : undefined,
        newPostUser : 1,
        editPostTitle : undefined,
        editPostBody : undefined,
        editPostUser : undefined,
        editPostId : undefined,
        editFormDisabled : true,        
    }

    componentDidMount() {
       (async () => {
            let posts = await JsonPlaceHolder('posts');            
            this.setState({posts});            
        })()
    }

    DeletePost = (e) => {
        
        (async () => {
            let targeetPostId = e.target.parentElement.id;
            let DeletePostNominal = await JsonPlaceHolder(`posts/${targeetPostId}`, 'DELETE');
                                 
            let targetPostIndex = this.state.posts.findIndex(post => post.id === parseInt(targeetPostId));
            this.state.posts.splice(targetPostIndex,1);
            
            this.setState({posts : this.state.posts});
        })()
    }

   
    HandleTextAreaAdd = (e) => this.setState({newPostBody: e.target.value});         

    HandleInputAdd = (e) => this.setState({newPostTitle: e.target.value});

    HandleAddForm = (e) => {
        e.preventDefault();        

        let newPost = {
            userId : this.state.newPostUser,
            title : this.state.newPostTitle,
            body : this.state.newPostBody
        };

        (async () => {                        
            let addPost = await JsonPlaceHolder('posts','POST', newPost );
                        
            this.setState({posts : this.state.posts.concat(addPost)});
            this.setState( {
                newPostBody : '',
                newPostTitle : ''
            })
        })();
    }
       
    HandleTextAreaEdit = (e) => this.setState({editPostBody: e.target.value});            

    HandleInputEdit = (e) => this.setState({editPostTitle: e.target.value});    

    HandleEditForm = (e) => {
        e.preventDefault();        
        
        let EditPost = {
            userId : this.state.editPostUser,
            id : this.state.editPostId,
            title : this.state.editPostTitle,
            body : this.state.editPostBody
            
        };
        
        (async () => {           
                    
            let editPost = await JsonPlaceHolder(`posts/${EditPost.id}`,'PUT', EditPost);
         
            this.state.posts.forEach(post => {
                if(post.id === editPost.id){
                    post.body = editPost.body;
                    post.title = editPost.title;
                }
             })
            this.setState({                
                editFormDisabled : true ,
                editPostBody : '' ,
                editPostTitle : ''               
            });
        })();
    }    
    
    EditPost = (e) => {
        let targetPostIndex = this.state.posts.findIndex(post => post.id === parseInt(e.target.parentElement.id));
        let targetPost =  this.state.posts[targetPostIndex];
       
        this.setState({
            editPostTitle : targetPost.title,
            editPostBody : targetPost.body,
            editPostUser : targetPost.userId,
            editPostId : targetPost.id,
            editFormDisabled : false
        })
    };
    

    render() {
        return (
            <>
            <h1>Posts from "JSONPlaceHolder"</h1>
            <div className='forms-container'>  
            {this.state.editFormDisabled ? 
                <FormAddPost HandleAddForm = {this.HandleAddForm} 
                             HandleInputAdd={this.HandleInputAdd}
                             HandleTextAreaAdd={this.HandleTextAreaAdd}
                             state ={this.state}/>            
                :
                <FormEditPost HandleEditForm = {this.HandleEditForm} 
                              HandleInputEdit={this.HandleInputEdit}
                              HandleTextAreaEdit={this.HandleTextAreaEdit}
                              state ={this.state}/> 
                              }                                 
                </div>                 
                
                {this.state.posts ? 
                    <ul>{this.state.posts.map((post,index) => 
                        <li id={post.id} key={index}><h3>{post.title}</h3><p>{post.body}</p>                           
                                <button onClick={this.DeletePost}>Delete</button>
                                <button onClick={this.EditPost}>Edit</button>                             
                        </li>).reverse()}
                    </ul>
                    : undefined
                }
            </>
        );
    }
}

export default Posts;