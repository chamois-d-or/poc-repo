// pages/[uid].js

//Components
import Head from 'next/head'
import Header from '../components/Header'
import SliceZone from 'next-slicezone'
import Loader from '../components/Loader'

//Prismic Client
import { Client } from '../utils/prismicHelpers'
import Prismic from '@prismicio/client'

//React tools
import React from 'react'
import { useRouter } from 'next/router'

// Menu GraphQuery
import { menuGraphQuery } from '../utils/graphQueries'

// Preview hook
import useUpdatePreviewRef from '../utils/useUpdatePreviewRef'

//Slices
import * as Slices from '../slices'
const resolver = ({ sliceName }) => Slices[sliceName];

export default function Page({ id, previewRef, slices, menuTabs, logo, currentLocale, locales  }) {
  
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }

  useUpdatePreviewRef(previewRef, id)

  return (
    <div>
      <Head>
        <title>Prismic PoC</title>
      </Head>
      <Header menuTabs={menuTabs} logo={logo}  locales={locales} currentLocale={currentLocale}/>
      <SliceZone slices={slices} resolver={resolver}/>
    </div>
  )
}

export async function getStaticProps({params, previewData, locale, locales  }) {
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { lang: locale, ref: previewRef } : { lang: locale }

  const document = await Client().getByUID('page',params.uid, refOption)

  //If page does not exist in Prismic then return a 404
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
      previewRef,
      id : document?.id,
      slices : document?.data?.slices || [],
      menuTabs: menu?.data?.menuTabs?.map((menuTab)=> menuTab.menuTab?.data || null) || [],
      logo: menu?.data?.logo || null,
      currentLocale: locale,
      locales: locales
    },
  }
}

export async function getStaticPaths() {
  const documents = await Client().query(Prismic.Predicates.at('document.type', 'page'),{ lang: '*' })

  return {
    paths: documents.results.map(doc => `/${doc.lang}/${doc.uid}`),
    fallback: true,
  }
}