import { GetGroups, SaveGroupAws } from '../services/GroupsHttpService'

export const load_groups = () => {
   return dispatch => {
      GetGroups().then(groups => {
         dispatch({
            type: 'LOAD_GROUPS',
            groups,
         })
      })
   }
}

export const save_group = group => {
   return dispatch => {
      SaveGroupAws(group).then(() => {
         dispatch({
            type: 'SAVE_GROUP',
            group,
         })
      })
   }
}
