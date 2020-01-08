import { message } from "antd"

export default () => {
    return next => action => {
        next(action)
        if(action.type === 'SAVE') {
            switch (action.isSaved){
                case true:
                    return message.success('Saved')
                case false:
                    return message.error('Failed to Save')
                default:
                    return

            }
        }
    }
}