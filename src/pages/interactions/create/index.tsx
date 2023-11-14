import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { interactionValidationSchema } from 'validationSchema/interactions';
import { UserInterface } from 'interfaces/user';
import { InteractionInterface } from 'interfaces/interaction';

function InteractionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: InteractionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.interaction.create({ data: values as RoqTypes.interaction });
      resetForm();
      router.push('/interactions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InteractionInterface>({
    initialValues: {
      interaction_type: '',
      interaction_timestamp: new Date(new Date().toDateString()),
      interaction_detail: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: interactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Interactions',
              link: '/interactions',
            },
            {
              label: 'Create Interaction',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Interaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.interaction_type}
            label={'Interaction Type'}
            props={{
              name: 'interaction_type',
              placeholder: 'Interaction Type',
              value: formik.values?.interaction_type,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="interaction_timestamp" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Interaction Timestamp
            </FormLabel>
            <DatePicker
              selected={formik.values?.interaction_timestamp ? new Date(formik.values?.interaction_timestamp) : null}
              onChange={(value: Date) => formik.setFieldValue('interaction_timestamp', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.interaction_detail}
            label={'Interaction Detail'}
            props={{
              name: 'interaction_detail',
              placeholder: 'Interaction Detail',
              value: formik.values?.interaction_detail,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/interactions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'interaction',
    operation: AccessOperationEnum.CREATE,
  }),
)(InteractionCreatePage);
