import React from 'react';

const FormAddPost = (props)=> {
    return (
        <div className='form'>
            <form onSubmit={props.HandleAddForm}>                    
                <input  value = {props.state.newPostTitle ? props.state.newPostTitle : ''  } 
                        onChange={props.HandleInputAdd} type="text" placeholder='enter post title' />                   
                <textarea value = {props.state.newPostBody ? props.state.newPostBody : ''  } 
                            onChange={props.HandleTextAreaAdd} placeholder='enter your text' ></textarea>                    
                <button type='submit'> Add new post</button>
            </form>
        </div>     
    );
}

export default FormAddPost;
