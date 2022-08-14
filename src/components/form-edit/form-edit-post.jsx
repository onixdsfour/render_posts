import React from 'react';

const FormEditPost = (props) => {
    return (
        <>
        {props ?
        <div className='form'>
            <form onSubmit={props.HandleEditForm}> 
                <fieldset> 
                    <legend>Edit and save</legend>                    
                        <input value={props.state.editPostTitle ? props.state.editPostTitle : ''  }
                                onChange={props.HandleInputEdit} type="text" placeholder='edit post title' />                    
                        <textarea rows="4" cols="33"
                                value={props.state.editPostBody ? props.state.editPostBody : ''  } 
                                onChange={props.HandleTextAreaEdit}placeholder='edit your text'>
                        </textarea>                    
                        <button type='submit'> Save changes</button>
                </fieldset>
            </form>
        </div>
        : undefined}
        </>
    );
}

export default FormEditPost;
