import React from "react"
import ContentLoader from "react-content-loader"

const PostSkeleton = (props:any) => (
    <ContentLoader 
    speed={2}

    viewBox="0 0 770 150"
    backgroundColor="#ffffff"
    foregroundColor="#b3b3b3"
    {...props}
  >
    <rect x="0" y="44" rx="3" ry="3" width="70%" height="113" /> 
    <rect x="0" y="4" rx="0" ry="0" width="70%" height="30" />
  </ContentLoader>
)

export default PostSkeleton