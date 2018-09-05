<template>
    <div id="app">
        We have found the following reviews for this page:
        <ul>
            <li v-for="(review,i) in apiResponse.data.reviews" v-bind:key="i">
                {{review.publisher.name}}:
                <a v-bind:href="review.url" title="Read the review">
                    {{review.title}}
                </a>
                ({{review.ratings.alternateName}})
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
