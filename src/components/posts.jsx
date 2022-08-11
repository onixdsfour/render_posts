import React, { Component } from 'react';
import './posts.css';
import JsonPlaceHolder from '../services/JsonPlaceHolder';


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
        editFormDisabled : true
    }

    componentDidMount() {
       (async () => {
            let posts = await JsonPlaceHolder('posts');            
            this.setState({posts : posts});            
        })()
    }

    DeletePost = (e) => {
        
        (async () => {
            let postId = e.target.parentElement.id;
            let DeletePostNominal = await JsonPlaceHolder(`posts/${postId}`, 'DELETE');
                                 
            let targetPostIndex = this.state.posts.findIndex(post => post.id === parseInt(e.target.parentElement.id));
            this.state.posts.splice(targetPostIndex,1);
            
            this.setState({posts : this.state.posts});
        })()
    }

    // Form for add post
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
            let addPostNominal = await JsonPlaceHolder('posts','POST', newPost );
            let addedPost =  await addPostNominal;
            
            this.setState({posts : this.state.posts.concat(addedPost)});
            this.setState( {
                newPostBody : '',
                newPostTitle : ''
            })
        })();
    }
    // Form for add post

    // Form for edit post
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
                    
            let editPostNominal = await JsonPlaceHolder(`posts/${EditPost.id}`,'PUT', EditPost);
            let editedPost =  await editPostNominal;
                      
            let targetPostIndex = this.state.posts.findIndex(post => post.id === parseInt(editedPost.id));

            this.setState(() => {
                this.state.posts.splice(targetPostIndex,1,editedPost);
                let changedPosts = this.state.posts;
                this.state.editFormDisabled = true;
                this.state.editPostBody = '';
                this.state.editPostTitle = '';
                               
                return {posts : changedPosts }
            });
        })();
    }
    // Form for edit post


    
    
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
                <div>
                    <form onSubmit={this.HandleAddForm}>                    
                        <input  value = {this.state.newPostTitle ? this.state.newPostTitle : ''  } 
                                onChange={this.HandleInputAdd} type="text" placeholder='enter post title' />                   
                        <textarea value = {this.state.newPostBody ? this.state.newPostBody : ''  } 
                                  onChange={this.HandleTextAreaAdd} placeholder='enter your text' ></textarea>                    
                        <button type='submit'> Add new post</button>
                    </form>
                </div>                     
                <div>
                    <form onSubmit={this.HandleEditForm}>                    
                        <input value={this.state.editPostTitle ? this.state.editPostTitle : ''  }
                               onChange={this.HandleInputEdit} type="text" placeholder='edit post title' />                    
                        <textarea value={this.state.editPostBody ? this.state.editPostBody : ''  } 
                                  onChange={this.HandleTextAreaEdit}placeholder='edit your text'></textarea>                    
                        <button disabled ={this.state.editFormDisabled} type='submit'> Save changes</button>
                    </form>
                </div>
                </div> 
                
                
                {this.state.posts ? 
                    <ul>{this.state.posts.map((post,index) => <li id={post.id} key={index}><h3>{post.title}</h3><p>{post.body}</p>
                        <button onClick={this.DeletePost}>Delete</button>
                        <button onClick={this.EditPost}>Edit</button>                
                        </li>)}
                    </ul>
                    : undefined
                }
            </>
        );
    }
}

export default Posts;