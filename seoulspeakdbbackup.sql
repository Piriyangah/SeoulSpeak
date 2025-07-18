PGDMP                      }        
   seoulspeak     12.18 (Debian 12.18-1.pgdg110+2)    17.5     �           0    0    ENCODING    ENCODING     #   SET client_encoding = 'SQL_ASCII';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    321444 
   seoulspeak    DATABASE     q   CREATE DATABASE seoulspeak WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE seoulspeak;
                     postgres    false            �           0    0    DATABASE seoulspeak    ACL     �   REVOKE CONNECT,TEMPORARY ON DATABASE seoulspeak FROM PUBLIC;
GRANT ALL ON DATABASE seoulspeak TO s0583874;
GRANT ALL ON DATABASE seoulspeak TO seoulspeak_piri;
GRANT ALL ON DATABASE seoulspeak TO freiheit;
                        postgres    false    2976                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                     postgres    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                        postgres    false    6            �            1259    399540    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50),
    password character varying(255),
    email character varying(50),
    role character varying(50)
);
    DROP TABLE public.users;
       public         heap r       s0583874    false    6            �            1259    399538    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               s0583874    false    6    205            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               s0583874    false    204            �            1259    398598 
   vocabulary    TABLE     a  CREATE TABLE public.vocabulary (
    id integer NOT NULL,
    korean character varying(255) NOT NULL,
    pronunciation character varying(255),
    english text NOT NULL,
    example text,
    meaning text,
    difficulty integer,
    CONSTRAINT vocabulary_difficulty_check CHECK ((((difficulty >= 1) AND (difficulty <= 5)) OR (difficulty IS NULL)))
);
    DROP TABLE public.vocabulary;
       public         heap r       s0583874    false    6            �            1259    398596    vocabulary_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vocabulary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.vocabulary_id_seq;
       public               s0583874    false    6    203            �           0    0    vocabulary_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.vocabulary_id_seq OWNED BY public.vocabulary.id;
          public               s0583874    false    202                       2604    399543    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               s0583874    false    204    205    205                       2604    398601    vocabulary id    DEFAULT     n   ALTER TABLE ONLY public.vocabulary ALTER COLUMN id SET DEFAULT nextval('public.vocabulary_id_seq'::regclass);
 <   ALTER TABLE public.vocabulary ALTER COLUMN id DROP DEFAULT;
       public               s0583874    false    202    203    203            �          0    399540    users 
   TABLE DATA           D   COPY public.users (id, username, password, email, role) FROM stdin;
    public               s0583874    false    205   �       �          0    398598 
   vocabulary 
   TABLE DATA           f   COPY public.vocabulary (id, korean, pronunciation, english, example, meaning, difficulty) FROM stdin;
    public               s0583874    false    203   �       �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 9, true);
          public               s0583874    false    204            �           0    0    vocabulary_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.vocabulary_id_seq', 120, true);
          public               s0583874    false    202                       2606    399545    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 s0583874    false    205                       2606    398607    vocabulary vocabulary_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.vocabulary
    ADD CONSTRAINT vocabulary_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.vocabulary DROP CONSTRAINT vocabulary_pkey;
       public                 s0583874    false    203            �   �  x�U��z�0 �>G�a
Ӯ6TD-
�n�2H"�O�[��{Wg��$�$Ύy-N^��c_��0���L��9�6�%��J�ñ����Av1��^)�~�	��k�R�S��ɩ'ݔ���ˮH�3�ؼԳ���D,Й��!j\T'�<5��&�G4���N��
�Ӟ���)���R���"u�i@z�z��U��A#^=d�΋�2ӌ�|.��ޓp2�:s]E��Q�7���d���^�����M�֒*/�����1Ϋ��wZ�~�[�ֻ`���zNך���3�I+���{����0#��fH㟢���-�f%Fe��h!���u}N��~��:��/�MG��?��4�
M�ɷ���t��u]��M�����R�U�w�O�J�j��9���r��j��<ZAMZ��E��Xo�7�;%�}��c�-A��)k��L�~wϝ�wfUVz�K�AC���kz_֜�̚��&�W`;��C���~��t����J      �   �  x��W�nG>�>E�rA������)��@�H���KOO��0?��/{K�HN�@2�G(�qP"q�m��wHu��n�m�,�{��ꫪ���6io�Z<��T�dED2�dq���t������'�-r�� :Ȓ"�bL�x�ND�E�Kڧ���M�R�7U��I�t�.~z!?��-w��w����^�Re%�"�IA�$�-���}�����D�SFr�� i��h{{��A��j1�yqt(O�<��+�����T��,���1�iYF�jQζH�7$�?��"<F�2.(Bt 5�������C�|���Jt���hZ�iEzQ�MUW26>z��������W$BL����㬿<ˣ��%ۅ�\H��o�fd+K��=";;��%��2�We:�7�����.��m��?�t�".�`䪰�%���d�?��Lrw��b��KB�瘒r�z;��0��zR�W.C_Z.�n�!:%-��h-:�R��JԶ%dZ	E"���\M�����唝��>R�b,��g)�&pƽ���{^�4�R:��:M�欘QL^Z!eWE���/9uYsJ)� !3l�����eqO�Mf���ɼ,I��Q훯�,�4�	r��Bd�
�Ҵ!ۅLQ�W1ǵ��C	ȗ&���h��q�J�*���*�0K�X����R�S�7��|�|��>'�1`Ga�I���N�B:)ETBUIz�ͤ�e�Kۺ"F.�Cٓ�$%����ta��F�7��k��^9�2Ř1ɀ�%]%CK�p�{ؗ��z:>|��a\���
F�j0�L$�l�F�XL%7d��%�J��*�y��=R��:��f�oH��b�Nq�a�$�ۭzt}LEJB�-�.=>-��)6��Y�j>�yu��ƍ��̭�Z7�ppNW��&�L$�@�	���
�ݎ�$`!#׀�ԀF�k��&��t ���$�ֲ�z�xx_�����3�
���SVC)Q:*fзt�rI�M��d�CGC�uA���\0�LWuu�|"d�D��5�4�4i��Tێ҅��`�-�&#W�q}���#�}�Kɲ��v�g�x|����dS�+���Y�d3����骰;F���E����e��ƀ��g��뒥�:�`g�V,���v��4�/�D��J�y��x�dg� �(n���~1��
c�T�ܜ@Q%��^Z���8��:\��n}��է��f.p����D�N_wE�	�c�&瀐5x���|3L�"K�:��yd��?�c��	�V�~���N�޿���+��<c9�	�3��Nd5.y��-�%��NT�R�u�+�O�=D*lYL�.�i��<��q��!��(�O�WK��J�uCD�����C�~i��]��>=��(�G{��V�����oլ�y��n�7DS�s�۳m�;�_ܙ���{������b�϶��Գ}�q%y����ũ�����=D�	]�g��O!�"ߐu�����_������}�F�lǬH�L4����?����>����>9�Gk����z��պJ     