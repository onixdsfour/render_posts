import React from 'react';

const FormAddPost = (props)=> {
    return (
        <>
        {props?
        <div className='form'>
            <form onSubmit={props.HandleAddForm}> 
                <fieldset> 
                    <legend>Create and send</legend>                  
                        <input  value = {props.state.newPostTitle ? props.state.newPostTitle : ''  } 
                                onChange={props.HandleInputAdd} type="text" placeholder='enter post title' />                   
                        <textarea rows="4" cols="33"
                                  value = {props.state.newPostBody ? props.state.newPostBody : ''  } 
                                  onChange={props.HandleTextAreaAdd} placeholder='enter your text' >
                        </textarea>                    
                        <button type='submit'> Add new post</button>
                </fieldset>
            </form>
        </div>    
        : undefined}
        </> 
    );
}

export default FormAddPost;
