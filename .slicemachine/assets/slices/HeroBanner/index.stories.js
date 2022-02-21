import MyComponent from '../../../../slices/HeroBanner';

export default {
  title: 'slices/HeroBanner'
}


export const _DefaultSlice = () => <MyComponent slice={{"variation":"default-slice","name":"Default slice","slice_type":"hero_banner","items":[],"primary":{"title":"revolutionize killer web-readiness","description":"cultivate B2B technologies","image":{"dimensions":{"width":1024,"height":325},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1024&h=325&fit=crop","mobile":{"dimensions":{"width":600,"height":410},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=410&fit=crop"}},"cta":"embrace plug-and-play architectures","CTALink":{"link_type":"Web","url":"https://slicemachine.dev"}},"id":"_DefaultSlice"}} />
_DefaultSlice.storyName = 'Default slice'

export const _WithoutCta = () => <MyComponent slice={{"variation":"withoutCta","name":"Without CTA","slice_type":"hero_banner","items":[],"primary":{"title":"generate back-end relationships","description":"morph extensible deliverables","image":{"dimensions":{"width":1024,"height":325},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?w=1024&h=325&fit=crop","mobile":{"dimensions":{"width":600,"height":410},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?w=600&h=410&fit=crop"}}},"id":"_WithoutCta"}} />
_WithoutCta.storyName = 'Without CTA'
