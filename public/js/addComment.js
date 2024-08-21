const addCommentFormEls = document.querySelectorAll(".addCommentForm");


async function handleAddCommentFormSubmit(event) {
    event.preventDefault();
    const targetBlogId = event.submitter.dataset.blogId
    const commenterId = event.submitter.dataset.userId
    const elementName = "newcomment-" + targetBlogId;
    const comment = document.getElementById(elementName);
    const aelementName = "alertMsg-" + targetBlogId;
    const alertMsgEl = document.getElementById(aelementName);
    console.log(targetBlogId, commenterId);
    try {
        const response = await fetch("/api/comment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blogId: targetBlogId,
                userId: commenterId,
                comment: comment.value
            })
        });

        if (response.ok) {
            alertMsgEl.textContent = "Comment added sucessfully. Page will refresh to display your comment."
            alertMsgEl.hidden = false;
            comment.value = ""
            setTimeout(() => {
                location.reload();
            }, 2000);
        }

    } catch (err) {

    }


}

for (let addCmtBtn of addCommentFormEls) {
    addCmtBtn.addEventListener("submit", (event) => handleAddCommentFormSubmit(event));
}

console.log("yo");