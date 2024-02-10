<script>
// @ts-nocheck    
	import { enhance } from '$app/forms';

    export let form  
    let submitting = false

    $: if (form && form.success === false) {
        submitting = false
    }

    function submitForm(e) {
        submitting = true
    }
</script>

<form on:submit={submitForm} use:enhance enctype="multipart/form-data" method="POST">
    <div class="mb-3">
        <label for="title" class="form-label">Book Title</label>
        <input
            type="text"
            name="title"
            class="form-control"
            id="title"
            value={form?.title || ''}
            class:is-invalid={form?.error_title}
            placeholder="Book Title"
        />
        {#if form?.error_title}
            <div class="invalid-feedback">{form?.error_title}</div>
        {/if}
    </div>
    <div class="mb-3">
        <label for="author" class="form-label">Author</label>
        <input
            type="text"
            name="author"
            class="form-control"
            id="author"
            value={form?.author || ''}
            class:is-invalid={form?.error_author}
            placeholder="Author"
        />
        {#if form?.error_author}
            <div class="invalid-feedback">{form?.error_author}</div>
        {/if}        
    </div>
    <div class="mb-3">
        <label for="short_description" class="form-label">Short Description</label>
        <input
            type="text"
            name="short_description"
            class="form-control"
            id="short_description"
            value={form?.short_description || ''}
            class:is-invalid={form?.error_short_description}
            placeholder="Enter short description"
        />
        {#if form?.error_short_description}
            <div class="invalid-feedback">{form?.error_short_description}</div>
        {/if}        
    </div>
    <div class="mb-3">
        <label class="form-label" for="description">Description</label>
        <textarea
            class="form-control"
            placeholder="Book Description here"
            id="description"
            name="description"
            style="height: 100px"
            value={form?.description || ''}
            class:is-invalid={form?.error_description}
        />
        {#if form?.error_description}
            <div class="invalid-feedback">{form?.error_description}</div>
        {/if}
    </div>
    <div class="mb-3">
        <label for="main_picture" class="form-label">Main Book Picture</label>
        <input
            class="form-control form-control-lg"
            id="main_picture"
            accept="image/*"
            name="main_picture"
            type="file"
            class:is-invalid={form?.error_main_picture}
        />
        {#if form?.error_main_picture}
            <div class="invalid-feedback">{form?.error_main_picture}</div>
        {/if}        
    </div>
    <div class="mb-3">
        <label for="small_picture" class="form-label">Small Book Picture</label>
        <input
            class="form-control form-control-lg"
            id="small_picture"
            accept="image/*"
            name="small_picture"
            type="file"
            class:is-invalid={form?.error_small_picture}
        />
        {#if form?.error_small_picture}
            <div class="invalid-feedback">{form?.error_small_picture}</div>
        {/if}          
    </div>
    <button disabled={submitting} type="submit" class="btn btn-primary w-100">
    {#if submitting}
        Submitting...
    {:else}
        Submit
    {/if}
    </button>
</form>