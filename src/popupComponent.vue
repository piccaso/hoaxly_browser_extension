<template>
    <div id="app">
        We have found the following reviews for this url:
        <ul>
            <li v-for="(review,i) in apiResponse.reviews" v-bind:key="i">
                {{review.publisher.name}}:
                <a v-bind:href="review.url">
                    {{review.title}}
                </a>
                ({{review.reviewRating.simplifiedRatingValue}})
            </li>
        </ul>
    </div>
</template>

<script>
/* 
    minimal setup...
    not even a style-loader: use the style tag in popup.html
*/
export default { props: ['apiResponse'] }
</script>
