// pages/index.js

//Components
import Head from 'next/head'
import Header from '../components/Header'
import SliceZone from 'next-slicezone'

//Prismic Client
import { Client } from '../utils/prismicHelpers'

// React
import React from 'react'

// Preview hook
import useUpdatePreviewRef from '../utils/useUpdatePreviewRef'

// Menu graphQuery
import { menuGraphQuery } from '../utils/graphQueries'

//Slices
import * as Slices from '../slices'
const resolver = ({ sliceName }) => Slices[sliceName];

export default function Home({ previewRef, id, slices, menuTabs, logo, currentLocale, locales }) {

  useUpdatePreviewRef(previewRef, id)

  return (
    <div>
      <Head>
        <title>Prismic PoC</title>
      </Head>
      <Header menuTabs={menuTabs} logo={logo} locales={locales} currentLocale={currentLocale}/>
      <SliceZone slices={slices} resolver={resolver}/>
    </div>
  )
}

export async function getStaticProps({ previewData, locale, locales }) {
  //Setting Repository Master Reference ID depending on preview data
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { lang: locale, ref: previewRef  } : { lang: locale }

  //Querying home page document
  const document = await Client().getSingle('home-page', refOption)

  //If homepage does not exist in Prismic then return a 404
  if(!document){
    return{
      notFound :true
    }
  }

  //Querying the Menu here so that it can be previewed at the same time as the page (in a release)
  const refOptionMenu = previewRef ? { ref: previewRef, lang: locale, 'graphQuery': menuGraphQuery } : {lang: locale, 'graphQuery': menuGraphQuery }
  const menu = (await Client().getSingle("menu", refOptionMenu)) || {};
  
  return {
    props: {
      id : document?.id || null,
      previewRef,
      slices : document?.data?.slices || [],
      menuTabs: menu?.data?.menuTabs?.map((menuTab)=> menuTab.menuTab?.data || null) || [],
      logo: menu?.data?.logo || null,
      currentLocale: locale,
      locales: locales
    },
  }
}