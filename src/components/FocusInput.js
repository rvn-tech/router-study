import React, { useContext } from 'react';
import { InputContext } from './WrappedComponents'

const FocusInput = React.forwardRef(({ input }, ref) => {
    console.log('FocusInput')
    const dispatch = useContext(InputContext)
    return (
        <div>
            <input
                type="text"
                ref={ref}
                value={input}
                onChange={e => dispatch(
                    {
                        type: 'KEYBOARD',
                        value: e.target.value
                    }
                )}
            />
        </div>
    )
})

export default React.memo(FocusInput)
