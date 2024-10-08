console.log("hello");
const editBtns = document.querySelectorAll(".edit-button");
const editTitleEl = document.getElementById("editTitle");
const editContentEl = document.getElementById("editContent")
const newTitleEl = document.getElementById("newTitle");
const newContentEl = document.getElementById("newContent")
const sbtEditFormBtnEl = document.getElementById("submitEditedForm");
const sbtNewFormBtnEl = document.getElementById("submitNewForm");
const postIdEl = document.getElementById("postId");
const alertMsgEl = document.getElementById("editalertMsg");
const nalertMsgEl = document.getElementById("newpostalertMsg");
const newPostBtnEl = document.getElementById("newPostBtn");


// TODO: Revisit
function displayMsgInAlertContainer(msg, msgType) {
    alertMsgEl.hidden = true ? false : true;
    alertMsgEl.textContent = msg;
    setTimeout(() => {
        location.reload();
    }, 2000);
    // if (msgType === "info") {
    //     alertMsgEl.classList.add("alert", "alert-primary", "mb-1");
    // } else {
    //     alertMsgEl.classList.add("alert", "alert-danger", "mb-1");
    // }
}


async function handleEditBtnClickEvent(event) {
    console.log("Clicked");
    const targetBlogId = event.target.dataset.blogId
    const editTitleEl = document.getElementById("editTitle");
    const editContentEl = document.getElementById("editContent")


    try {
        const response = await fetch(`/api/blog/${targetBlogId}`)
        const data = await response.json();
        // console.log(data);
        if (data.status === 200) {
            editTitleEl.value = data.data.blogTitle;
            editContentEl.value = data.data.blogText;
            postIdEl.textContent = data.data.id

        }

    } catch (err) {

    }

}

async function handleEditBlogFormSubmit(event) {

    const targetBlogId = document.getElementById("postId").textContent;
    const request = {
        blogTitle: editTitleEl.value,
        blogText: editContentEl.value
    }
    try {
        const response = await fetch(`/api/blog/${targetBlogId}`, {
            method: 'PUT', // Specify the HTTP method as PUT
            headers: {
                'Content-Type': 'application/json' // Indicate the type of content being sent
            },
            body: JSON.stringify(request) // Convert the data object to a JSON string
        });
        const data = await response.json();
        console.log("put call response data from client: ", data);
        if (data.status === 200 && data.data[0] === 1) {

            displayMsgInAlertContainer("Record updated successfully! Page will refresh.", "info");
            //window.location.href = "/dashboard"
        }

    } catch (err) {
        //TODO: This block not entered
        const error = "Error while updating blog post: " + err;
        console.log(error);
        displayMsgInAlertContainer(error, "danger");
    }

}

async function handleNewPostBtnClick(event) {
    const user_id = event.target.dataset.userId;
    try {
        const response = await fetch("/api/blog", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blog_title: newTitleEl.value,
                user_id: user_id,
                blog_text: newContentEl.value
            })
        });

        if (response.ok) {
            nalertMsgEl.textContent = "Blogpost added sucessfully. Page will refresh to display your blog."
            nalertMsgEl.hidden = false;
            newTitleEl.value = "";
            newContentEl.value = "";
            setTimeout(() => {
                location.reload();
            }, 2000);
        }

    } catch (err) {

    }
}

for (let editBtn of editBtns) {
    editBtn.addEventListener("click", (event) => handleEditBtnClickEvent(event));
}

sbtEditFormBtnEl.addEventListener("click", (event) => handleEditBlogFormSubmit(event));

sbtNewFormBtnEl.addEventListener("click", (event) => handleNewPostBtnClick(event));


