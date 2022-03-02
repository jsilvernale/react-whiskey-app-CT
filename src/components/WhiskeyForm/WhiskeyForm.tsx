import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseBrand, chooseType, choosePercent } from '../../Redux/slices/RootSlice'
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';


interface WhiskeyFormProps {
    id?: string;
    data?: {};
};

interface WhiskeyState{
    brand: string;
    type: string;
    alc_percent: string;
};

export const WhiskeyForm = (props: WhiskeyFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const brand = useSelector<WhiskeyState>(state => state.brand);
    const { register, handleSubmit } = useForm({ })
    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated: ${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            dispatch(chooseBrand(data.brand));
            dispatch(chooseType(data.type));
            dispatch(choosePercent(data.alc_percent));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)      
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='brand'>Whiskey Brand</label>
                <input {...register('brand')} name='brand' placeholder='Whiskey Brand' />
            </div>
            <div>
                <label htmlFor='type'>Whiskey Type</label>
                <input {...register('type')} name='type' placeholder='Whiskey Type' />
            </div>
            <div>
                <label htmlFor='alc_percent'>Alcohol Percent</label>
                <input {...register('alc_percent')} name='alc_percent' placeholder='Alcohol Percent' />
            </div>
            <Button type='submit'>Submit Your Whiskey</Button>
        </form>
    </div>
  )
}
