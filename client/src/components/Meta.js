import React from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({title,description,keyword}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keyword' content={keyword}></meta>
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Welcome To MyShop',
  description : 'We sell best product for cheap',
  keyword : 'electronics'
}
export default Meta
