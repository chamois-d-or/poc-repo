import MyComponent from '../../../../slices/PromoSectionWithBackgroundImage';

export default {
  title: 'slices/PromoSectionWithBackgroundImage'
}


export const _DefaultSlice = () => <MyComponent slice={{"variation":"default-slice","name":"Default slice","slice_type":"promo_section_with_background_image","items":[],"primary":{"title":[{"type":"heading1","text":"Reinvent customized e-commerce","spans":[]}],"description":[{"type":"paragraph","text":"Occaecat Lorem qui esse veniam sit.","spans":[]}],"image":{"dimensions":{"width":1216,"height":482},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1216&h=482&fit=crop","mobile":{"dimensions":{"width":605,"height":443},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=605&h=443&fit=crop"}},"link":{"link_type":"Web","url":"http://google.com"},"linkLabel":"evolve cross-platform functionalities","testField":[{"type":"paragraph","text":"Commodo ipsum id pariatur sit proident excepteur ad ad nostrud proident ex tempor nisi anim.","spans":[]}]},"id":"_DefaultSlice"}} />
_DefaultSlice.storyName = 'Default slice'

export const _CameraInsurance = () => <MyComponent slice={{"variation":"cameraInsurance","name":"Camera Insurance","slice_type":"promo_section_with_background_image","items":[],"primary":{},"id":"_CameraInsurance"}} />
_CameraInsurance.storyName = 'Camera Insurance'
