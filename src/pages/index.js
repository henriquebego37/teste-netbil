import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import api from '../services/axios';
import styles from '../../styles/Home.module.css';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { Notification } from '../components/Notification';

export default function Home(responseData) {
  const [success, setSuccess] = useState(responseData.responseData.success);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
      };

      setLoading(true);
      const response = await api.post('teste/frontend', data);
      setLoading(false);

      Notification({
        type: 'success',
        title: 'Enviado',
        description: 'Usuário Cadastrado com sucesso',
      });
      console.log(response.data);
    } catch (error) {
      Notification({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível cadastrar',
      });
      console.log(error);
    }
  }

  function handleClose() {
    setName('');
    setEmail('');
    setPassword('');

    setLoading(false);

    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.container}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Acessar Formulário
        </Button>
        <h2>{responseData.responseData.message}</h2>
        {success === true && (
          <span
            className={styles.span}
            style={{ backgroundColor: 'green', marginBottom: '10px' }}
          >
            Sucesso
          </span>
        )}

        {responseData.responseData.data.map((item) => (
          <>
            <section className={styles.section}>{item.heading}</section>
            <h6>{item.content}</h6>
          </>
        ))}
      </div>

      <Modal
        title="Cadastro de Usuário"
        visible={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose} type="default">
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleRegister}
          >
            Salvar
          </Button>,
        ]}
      >
        <Form.Item
          labelCol={{ span: 23 }}
          label="Nome:"
          labelAlign={'left'}
          style={{ backgroundColor: 'white', fontWeight: 'bold' }}
          required
        >
          <Input
            key="supplierName"
            size="large"
            style={{ width: 400 }}
            placeholder="Digite o Nome do Usuário"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 23 }}
          label="Email:"
          labelAlign={'left'}
          style={{ backgroundColor: 'white', fontWeight: 'bold' }}
          required
        >
          <Input
            key="email"
            size="large"
            style={{ width: 400 }}
            placeholder="Digite o Email do Usuário"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 23 }}
          label="Senha:"
          labelAlign={'left'}
          style={{ backgroundColor: 'white', fontWeight: 'bold' }}
          required
        >
          <Input.Password
            size="large"
            style={{ width: 250 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
      </Modal>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { data } = await api.get('teste/frontend');

    return {
      props: {
        responseData: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        tenant: [],
      },
    };
  }
};
