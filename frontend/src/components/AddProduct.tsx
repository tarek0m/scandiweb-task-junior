import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product-type';
import Header from './Header';
import SharedDataContext from '../shared/SharedDataContext';
import { ADDRESS } from '../services/api-address';

const AddProduct = () => {
  const [data, setData] = useState({} as Product);
  const [type, setType] = useState('' as string);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    sku: '',
    name: '',
    price: '',
    productType: '',
    size: '',
    height: '',
    width: '',
    length: '',
    weight: '',
  } as Product | any);

  const { sharedData } = useContext(SharedDataContext);
  const sharedDataArray = sharedData.split(',');

  function validateSKU(inputValue: string): boolean {
    const pattern = /^SKUTest\d{3}$/;
    return pattern.test(inputValue);
  }

  function validateName(inputValue: string): boolean {
    const pattern = /^NameTest\d{3}$/;
    return pattern.test(inputValue);
  }

  function validateNumber(inputValue: string): boolean {
    const pattern = /^(\d+(\.\d+)?|\.\d+)$/;
    return pattern.test(inputValue);
  }

  function validateInput(id: string, value: string) {
    switch (id) {
      case 'sku':
        if (sharedDataArray.includes(value)) {
          errors.sku = 'This SKU already exists';
        } else if (!value) {
          errors.sku = 'SKU is required';
        } else if (!validateSKU(value)) {
          errors.sku = 'SKU must be in SKUTest### format';
        } else {
          const { sku, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'name':
        if (!value) {
          errors.name = 'Name is required';
        } else if (!validateName(value)) {
          errors.name = 'Name must be in NameTest### format';
        } else {
          const { name, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'price':
        if (!validateNumber(value)) {
          errors.price = 'Price must be a number';
        } else if (!value) {
          errors.price = 'Price is required';
        } else if (parseInt(value) < 1) {
          errors.price = 'Price must be greater than 0';
        } else {
          const { price, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'productType':
        if (value === '') {
          errors.productType = 'Type is required';
        }
        if (value === 'DVD') {
          const { productType, height, width, length, weight, ...rest } =
            errors;
          setErrors(rest);
        }
        if (value === 'Furniture') {
          const { productType, size, weight, ...rest } = errors;
          setErrors(rest);
        }
        if (value === 'Book') {
          const { productType, size, height, width, length, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'size':
        if (!validateNumber(value)) {
          errors.price = 'Price must be a number';
        } else if (!value) {
          errors.size = 'Size is required';
        } else if (parseFloat(value) < 0.01) {
          errors.size = 'Size must be greater than 0';
        } else {
          const { size, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'height':
        if (!validateNumber(value)) {
          errors.price = 'Price must be a number';
        } else if (!value) {
          errors.height = 'Height is required';
        } else if (parseFloat(value) < 0.01) {
          errors.height = 'Height must be greater than 0';
        } else {
          const { height, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'width':
        if (!validateNumber(value)) {
          errors.price = 'Price must be a number';
        } else if (!value) {
          errors.width = 'Width is required';
        } else if (parseFloat(value) < 0.01) {
          errors.width = 'Width must be greater than 0';
        } else {
          const { width, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'length':
        if (!validateNumber(value)) {
          errors.price = 'Price must be a number';
        } else if (!value) {
          errors.length = 'Length is required';
        } else if (parseFloat(value) < 0.01) {
          errors.length = 'Length must be greater than 0';
        } else {
          const { length, ...rest } = errors;
          setErrors(rest);
        }
        break;
      case 'weight':
        if (!validateNumber(value)) {
          errors.price = 'Price must be a number';
        } else if (!value) {
          errors.weight = 'Weight is required';
        } else if (parseFloat(value) < 0.01) {
          errors.weight = 'Weight must be greater than 0';
        } else {
          const { weight, ...rest } = errors;
          setErrors(rest);
        }
        break;
      default:
        break;
    }

    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      return;
    }
    axios.post(`${ADDRESS}/public/home/addProduct`, data).then(() => {
      navigate('/');
    });

    event.preventDefault();
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { id, value } = event.currentTarget;

    if (id === 'productType') {
      setType(value);
    }

    validateInput(id, value);

    setData({ ...data, [id]: value });
  }

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <nav className='nav-container mb-3'>
        <Header title='Product Add' />
        <div>
          <button
            // disabled={Object.keys(errors).length > 0}
            type='submit'
            form='product_form'
            className='btn btn-outline-dark m-1'
          >
            Save
          </button>
          <button
            type='button'
            className='btn btn-outline-dark m-1'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </nav>

      <form className='my-form' id='product_form' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='sku' className='form-label'>
            SKU
          </label>
          <input
            type='text'
            className='form-control'
            id='sku'
            onChange={handleChange}
          />
          {errors.sku && <span className='text-danger'>{errors.sku}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            onChange={handleChange}
          />
          {errors.name && <span className='text-danger'>{errors.name}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price ($)
          </label>
          <input
            type='number'
            className='form-control'
            id='price'
            min={1}
            step='0.01'
            onChange={handleChange}
          />
          {errors.price && <span className='text-danger'>{errors.price}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='productType' className='form-label'>
            Type Switcher
          </label>
          <select
            className='form-select'
            id='productType'
            onChange={handleChange}
          >
            <option value=''></option>
            <option value='DVD'>DVD</option>
            <option value='Furniture'>Furniture</option>
            <option value='Book'>Book</option>
          </select>
          {errors.productType && (
            <span className='text-danger'>{errors.productType}</span>
          )}
        </div>
        {type === 'DVD' && (
          <div className='my-little-form'>
            <small className='mb-3 text-body-secondary'>
              Please provide size in Mega Bytes
            </small>
            <div className='mb-3 row-cols-auto'>
              <label htmlFor='size' className='form-label'>
                Size (MB)
              </label>
              <input
                type='number'
                className='form-control'
                id='size'
                min={0.01}
                step='0.01'
                onChange={handleChange}
              />
              {errors.size && (
                <span className='text-danger'>{errors.size}</span>
              )}
            </div>
          </div>
        )}

        {type === 'Furniture' && (
          <div className='my-little-form'>
            <small className='mb-3 text-body-secondary'>
              Please provide dimensions in HxWxL format
            </small>
            <div className='mb-3 row-cols-auto'>
              <label htmlFor='height' className='form-label'>
                Height (CM)
              </label>
              <input
                type='number'
                className='form-control'
                id='height'
                min={0.01}
                step='0.01'
                onChange={handleChange}
              />
              {errors.height && (
                <span className='text-danger'>{errors.height}</span>
              )}
            </div>
            <div className='mb-3 row-cols-auto'>
              <label htmlFor='width' className='form-label'>
                Width (CM)
              </label>
              <input
                type='number'
                className='form-control'
                id='width'
                min={0.01}
                step='0.01'
                onChange={handleChange}
              />
              {errors.width && (
                <span className='text-danger'>{errors.width}</span>
              )}
            </div>
            <div className='mb-3 row-cols-auto'>
              <label htmlFor='length' className='form-label'>
                Length (CM)
              </label>
              <input
                type='number'
                className='form-control'
                id='length'
                min={0.01}
                step='0.01'
                onChange={handleChange}
              />
              {errors.length && (
                <span className='text-danger'>{errors.length}</span>
              )}
            </div>
          </div>
        )}

        {type === 'Book' && (
          <div className='my-little-form'>
            <small className='mb-3 text-body-secondary'>
              Please provide weight of the book in Kilo Grams
            </small>
            <div className='mb-3 row-cols-auto'>
              <label htmlFor='weight' className='form-label'>
                Weight (KG)
              </label>
              <input
                type='number'
                className='form-control'
                id='weight'
                min={0.01}
                step='0.01'
                onChange={handleChange}
              />
              {errors.weight && (
                <span className='text-danger'>{errors.weight}</span>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default AddProduct;
