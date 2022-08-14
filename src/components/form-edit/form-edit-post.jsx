import React from 'react';

const FormEditPost = (props) => {
    return (
        <div className='form'>
            <form onSubmit={props.HandleEditForm}>                    
                <input value={props.state.editPostTitle ? props.state.editPostTitle : ''  }
                    onChange={props.HandleInputEdit} type="text" placeholder='edit post title' />                    
                <textarea value={props.state.editPostBody ? props.state.editPostBody : ''  } 
                        onChange={props.HandleTextAreaEdit}placeholder='edit your text'></textarea>                    
                <button disabled ={props.state.editFormDisabled} type='submit'> Save changes</button>
            </form>
        </div>
    );
}

export default FormEditPost;
