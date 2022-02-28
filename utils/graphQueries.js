//This query gets related tabs for the menu
export const menuGraphQuery = `{
    menu{
      logo
      menuTabs{
        menuTab{
          ...onmenuTab{
            title
            slices{
              ...onmenu_sub_tab{
                variation{
                  ...ondefault-slice{
                    primary{
                      sectionTitle
                    }
                    items{
                      subSectionTitle
                      subSectionLink
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`